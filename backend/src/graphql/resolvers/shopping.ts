import { IResolvers } from '@graphql-tools/utils';
import { CartItem } from '../../model/CartItem';
import { Db, ObjectId } from 'mongodb';

/**
 * Resolver para las queries que tienen que ver con los productos y el carrito de compras
 */
const shoppingResolvers: IResolvers = {
    Query: {
        /**
         * Retorna los productos existentes en base de datos
         * Se pueden aplicar filtros con criterios como: categoria, nombre, precio(minimo y maximo)
         * 
         * Si no se pasan filtros retorna todos los productos en base de datos
         * 
         * Se puede usar sin autenticar
         */
        getProductsByCriteria: async (parent, args, context: { db: Db }) => {
            let query = {};

            if (args.filter) {
                const { category, name, minPrice, maxPrice } = args.filter;
                query = {
                    ...(category && { category }),
                    ...(name && { name: { $regex: name, $options: 'i' } }),
                    ...(minPrice && { price: { $gte: minPrice } }),
                    ...(maxPrice && { price: { $lte: maxPrice } })
                };
            }

            const products = await context.db.collection('products').find(query).toArray();
            return products;
        },
        /**
         * Retorna la información de un producto es especifico en base al id
         * 
         * Se puede usar sin autenticar
         */
        getProductById: async (parent, { id }, context: { db: Db }) => {
            const product = await context.db.collection('products').findOne({ _id: new ObjectId(id) });
            if (!product) throw new Error('Product not found');
            return product;
        },
        /**
         * Retorna el carrito de compras de un usuario en especifico
         * 
         * Debe estar autenticado como 'user' para poder usarse
         * Los admin no pueden ver su carrito de compras
         */
        cart: async (parent, args, context:{user: any}) => {
            if (!context.user || context.user.role != 'user') {
                throw new Error('Not authenticated as user');
            }
            return context.user.cart;
        },
    },
    Mutation: {
        /**
         * Registra un nuevo producto en la base de datos
         * 
         * Debe estar autenticado como 'admin'
         */
        createProduct: async (parent, { input }, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'admin') {
                throw new Error('Not authorized');
            }

            const newProduct = {
                ...input,
            };
            await context.db.collection('products').insertOne(newProduct);
            return newProduct;
        },
        /**
         * Actualiza la información de un producto en base de datos por medio de su id
         * 
         * Debe estar autenticado como 'admin'
         */
        updateProduct: async (parent, { id, input }, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'admin') {
                throw new Error('Not authorized');
            }

            const result = await context.db.collection('products').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: input },
                { returnDocument: 'after' }
            );
            
            if (!result) throw new Error('Product not found');
            return result;
            
        },
        /**
         * Elimina un producto de la base de datos por medio del id
         * 
         * Debe estar autenticado como 'admin'
         */
        deleteProduct: async (parent, { id }, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'admin') {
                throw new Error('Not authorized');
            }

            const result = await context.db.collection('products').deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) throw new Error('Product not found');
            return true;
        },
        /**
         * Agrega un producto al carrito de compra del usuario
         * 
         * Si el producto ya existe en el carrito, se suma
         * la nueva catindad del producto al carrito
         * 
         * Actualiza el precio total del carrito y la cantidad total de items
         * 
         * Debe estar autenticado como 'user'
         */
        addToCart: async (parent, { productId, quantity = 1 }, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'user') {
                throw new Error('Not authenticated as user');
            }

            const product = await context.db.collection('products').findOne({ _id: new ObjectId(productId) });
            if (!product) throw new Error('Product not found');
            if (quantity > product.stock) throw new Error('Quantity must be less or equal to stock');

            const userCart = context.user.cart;
            const existingItemIndex = userCart.items.findIndex(
                (item: CartItem) => item.product._id.toString() === new ObjectId(productId).toString());

            if (existingItemIndex !== -1) {
                const existingItem = userCart.items[existingItemIndex];
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > product.stock) {
                    throw new Error('Quantity must be less or equal to stock');
                }
                existingItem.quantity = newQuantity;
            } else {
                userCart.items.push({ product, quantity });
            }

            userCart.totalQuantity += quantity;
            userCart.totalPrice += product.price * quantity;

            await context.db.collection('users').updateOne(
                { _id: new ObjectId(context.user._id) },
                { $set: { cart: userCart } }
            );

            return { product, quantity };
        },
        /**
         * Elimina un producto del carrito del usuario de compra por medio del id
         * 
         * Actualiza el precio total del carrito y la cantidad total de items
         * 
         * Debe estar autenticado como 'user'
         */
        removeFromCart: async (parent, { productId }, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'user') {
                throw new Error('Not authenticated as user');            }
            

            const userCart = context.user.cart;

            const itemIndex = userCart.items.findIndex(
                (item: CartItem) => item.product._id.toString() === new ObjectId(productId).toString());

            if (itemIndex !== -1) {

                const removedItem = userCart.items[itemIndex];
                userCart.totalPrice -= removedItem.quantity * removedItem.product.price;
                userCart.totalQuantity -= removedItem.quantity;
                userCart.items.splice(itemIndex, 1);

                await context.db.collection('users').updateOne(
                    { _id: new ObjectId(context.user._id) },
                    { $set: { cart: userCart } }
                );

                return removedItem;
            }

            throw new Error('Product not found in cart');
        },
        /**
         * Actualiza la cantidad del producto en el carrito del usuario
         * 
         * Actualiza el precio total del carrito y la cantidad total de items
         * 
         * Debe estar autenticado como 'user'
         */
        updateCartItemQuantity: async (parent, { productId, quantity }, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'user') {
                throw new Error('Not authenticated as user');
            }

            const userCart = context.user.cart;
            const itemIndex = userCart.items.findIndex(
                (item: CartItem) => item.product._id.toString() === new ObjectId(productId).toString());

            if (itemIndex !== -1) {
                if (quantity <= 0) {
                    throw new Error('Quantity cannot be zero or negative');
                }

                const product = await context.db.collection('products').findOne({ _id: new ObjectId(productId) });
                if (!product || quantity > product.stock) {
                    throw new Error('Quantity must be less or equal to stock');
                }

                const cartItem = userCart.items[itemIndex];
                userCart.totalPrice -= cartItem.quantity * cartItem.product.price;
                userCart.totalQuantity -= cartItem.quantity;

                cartItem.quantity = quantity;

                userCart.totalPrice += cartItem.quantity * cartItem.product.price;
                userCart.totalQuantity += cartItem.quantity;

                await context.db.collection('users').updateOne(
                    { _id: new ObjectId(context.user._id) },
                    { $set: { cart: userCart } }
                );

                return cartItem;
            }

            throw new Error('Product not found in cart');
        },
        /**
         * Elimina todos los elementos del carrito del usuario
         * 
         * Actualiza el precio total del carrito y la cantidad total de items
         * 
         * Debe estar autenticado como 'user'
         */
        clearCart: async (parent, args, context: { db: Db, user: any }) => {
            if (!context.user || context.user.role !== 'user') {
                throw new Error('Not authenticated as user');
            }

            context.user.cart.items = [];
            context.user.cart.totalPrice = 0;
            context.user.cart.totalQuantity = 0;

            await context.db.collection('users').updateOne(
                { _id: new ObjectId(context.user._id) },
                { $set: { cart: context.user.cart } }
            );

            return context.user.cart;
        },
    },
};

export default shoppingResolvers;
