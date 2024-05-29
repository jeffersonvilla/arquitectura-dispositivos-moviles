import React, { useEffect, useState } from 'react';
import { List, Button, InputNumber, message } from 'antd';
import axios from 'axios';
import axiosConfig from '../axiosConfig';
import { getProductsQuery } from '../queriesAndMutations/products';
import { addToCartMutation } from '../queriesAndMutations/cart';

/**
 * Componente para listar los productos en base de datos
 * Con funcionalidad para agregar productos al carrito de compras del usuario
 * 
 * Emplea los query y mutaciones definidos en el folder queriesAndMutations (cart, products)
 */
const ProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});


    /**
     * Obtiene todos los productos de la base de datos
     */
    const fetchProducts = async () => {
        try {

            const response = await axios.post('http://localhost:37111/graphql', { query: getProductsQuery });

            setProducts(response.data.data.getProductsByCriteria);
            setLoading(false);

        } catch (err) {
            setError('Error loading products');
            setLoading(false);
        }
    };

    /**
     * Actualiza la lista de productos cada 4 segundos
     */
    useEffect(() => {

        fetchProducts();

        const interval = setInterval(() => {
            fetchProducts();
        }, 4000);

        return () => clearInterval(interval);

    }, []);

    /**
     * Agrega el producto al carrito en base al id 
     * y pasando la cantidad que desea agregar
     */
    const handleAddToCart = async (productId: string) => {
        try {
            const quantity = quantities[productId] || 1;
        
            const result = await axiosConfig.post('', {
                query: addToCartMutation,
                variables: { productId, quantity },
            });

            console.log(result)

            message.success('Product added to cart!');
        } catch (err) {
            message.error('Failed to add product to cart.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <List
            itemLayout="horizontal"
            dataSource={products}
            renderItem={(product: any) => (
                <List.Item
                    actions={[
                        <InputNumber
                            min={1}
                            defaultValue={1}
                            onChange={(value) => setQuantities({ ...quantities, [product._id]: value })}
                        />,
                        <Button type="primary" onClick={() => handleAddToCart(product._id)}>
                            Add to Cart
                        </Button>
                    ]}
                >
                    <List.Item.Meta
                        title={product.name}
                        description={`Price: $${product.price}
                            | Category: ${product.category}
                            | Stock: ${product.stock}`}
                    />
                </List.Item>
            )}
        />
    );
};

export default ProductList;
