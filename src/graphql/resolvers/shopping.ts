import { IResolvers } from '@graphql-tools/utils';
import { productsDataSource } from '../../data/productsdata';

const shoppingResolvers: IResolvers = {
    Query: {
        getProductsByCriteria: (parent, args) => {
            let filteredProducts = productsDataSource;

            if (args.filter) {
                const { category, name, minPrice, maxPrice } = args.filter;

                filteredProducts = filteredProducts.filter((product) => {
                    return ((category && product.category !== category)
                        || (name && !product.name.toLowerCase().includes(name.toLowerCase()))
                        || (minPrice && product.price < minPrice)
                        || (maxPrice && product.price > maxPrice)) ? false : true;
                });
            }

            return filteredProducts;
        },
        getProductById: (parent, { id }) => {
            return productsDataSource.find((product) => product.id === id);
        },
        cart: () => cart,
    },
    Mutation: {
        createProduct: (parent, { input }, context) => {
            if(!context.user || context.user.role !== 'admin'){
                throw new Error('Not authorized');
            }
            const newProduct = {
                id: String(productsDataSource.length + 1),
                ...input,
            };
            productsDataSource.push(newProduct);
            return newProduct;
        },
        updateProduct: (parent, { id, input }, context) => {
            if(!context.user || context.user.role !== 'admin'){
                throw new Error('Not authorized');
            }
            const productIndex = productsDataSource.findIndex((product) => product.id === id);
            if (productIndex !== -1) {
                productsDataSource[productIndex] = { ...productsDataSource[productIndex], ...input };
                return productsDataSource[productIndex];
            }
            throw new Error("Person not found");
        },
        deleteProduct: (parent, { id }, context) => {
            if(!context.user || context.user.role !== 'admin'){
                throw new Error('Not authorized');
            }
            const productIndex = productsDataSource.findIndex((product) => product.id === id);
            if (productIndex !== -1) {
                productsDataSource.splice(productIndex, 1);
                return true;
            }
            throw new Error("Person not found");
        },
        addToCart: (parent, { productId, quantity = 1 }, context) => {
            if(!context.user || context.user.role !== 'user'){
                throw new Error('Not authenticated');
            }
            const product = productsDataSource.find((p) => p.id === productId);
            if (!product) {
                throw new Error("Product not found");
            }

            if(quantity > product.stock) {
                throw new Error("Quantity must be less or equals than stock");
            }

            const existingItem = cart.items.find((item) => item.product.id === productId);
            if (existingItem) {
                if (existingItem.quantity + quantity > product.stock) {
                    throw new Error("Quantity must be less or equals than stock");
                }
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product, quantity });
            }

            cart.totalQuantity += quantity;
            cart.totalPrice += product.price * quantity;

            return { product, quantity };
        },
        removeFromCart: (parent, { productId }, context) => {
            if(!context.user || context.user.role !== 'user'){
                throw new Error('Not authenticated');
            }
            const itemIndex = cart.items.findIndex((item) => item.product.id === productId);

            if (itemIndex !== -1) {

                cart.totalPrice -= cart.items[itemIndex].quantity * cart.items[itemIndex].product.price;
                cart.totalQuantity -= cart.items[itemIndex].quantity;

                const removedItem = cart.items.splice(itemIndex, 1)[0];
                return removedItem;
            }

            throw new Error("Product not found in cart");
        },
        updateCartItemQuantity: (parent, { productId, quantity }, context) => {
            if(!context.user || context.user.role !== 'user'){
                throw new Error('Not authenticated');
            }
            const itemIndex = cart.items.findIndex((item) => item.product.id === productId);
            if (itemIndex !== -1) {
                if (quantity <= 0) {
                    throw new Error("Quantity cannot be zero or negative");
                }

                if (quantity > cart.items[itemIndex].product.stock) {
                    throw new Error("Quantity must be less or equals than stock");
                }

                let itemsPrice = cart.items[itemIndex].quantity * cart.items[itemIndex].product.price;
                cart.totalPrice = cart.totalPrice - itemsPrice;

                cart.totalQuantity -= cart.items[itemIndex].quantity;

                //Update quantity
                cart.items[itemIndex].quantity = quantity;

                cart.totalPrice += cart.items[itemIndex].quantity * cart.items[itemIndex].product.price; 
                cart.totalQuantity += cart.items[itemIndex].quantity;

                return cart.items[itemIndex];
            }

            throw new Error("Product not found in cart");
        },
        clearCart: (parent, args, context) => {
            if(!context.user || context.user.role !== 'user'){
                throw new Error('Not authenticated');
            }
            cart.items = [];
            cart.totalPrice = 0;
            cart.totalQuantity = 0;
            return cart;
        },
    },
};

type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Cart = {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
};

let cart : Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
};

export default shoppingResolvers;