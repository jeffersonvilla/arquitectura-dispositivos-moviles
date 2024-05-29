import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { List, Button, InputNumber, message } from 'antd';
import axiosConfig from '../axiosConfig';
import { updateCartMutation, getCartQuery, deleteFromCartMutation, clearCartMutation } from '../queriesAndMutations/cart';

/**
 * Componente para listar los productos del carrito de compras del usuario
 * Con funcionalidad para cambiar la cantidad de los productos, eliminar productos del carrito
 * y limpiar el carrito de compras (Eliminar todos los productos)
 * 
 * Emplea los query y mutaciones definidos en el folder queriesAndMutations (cart)
 */
const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cartTotalPrice, setCartTotalPrice] = useState<number>(0);
    const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0);

    /**
     * Trae los items e información del carrito de compra del usuario
     */
    const fetchCart = async () => {
        try {

            const response = await axiosConfig.post('', { query: getCartQuery });

            setCartItems(response.data.data.cart.items);
            setCartTotalPrice(response.data.data.cart.totalPrice);
            setCartTotalQuantity(response.data.data.cart.totalQuantity);
            setLoading(false);
        } catch (err) {
            setError('Error loading cart');
            setLoading(false);
        }
    };

    /**
     * Actualiza el carrito cada 2 segundos
     */
    useEffect(() => {
        fetchCart();

        const interval = setInterval(() => {
            fetchCart();
        }, 2000);

        return () => clearInterval(interval);

    }, []);

    /**
     * Actualiza la cantidad de un producto en el carrito del usuario por medio del id
     * 
     */
    const handleUpdateQuantity = async (productId: string, quantity: number) => {
        try { 

            await axiosConfig.post('', { query: updateCartMutation , variables: { productId, quantity } });

            message.success('Cart updated successfully!');

            fetchCart();

            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === productId ? { ...item, quantity } : item
                )
            );

        } catch (err) {
            message.error('Failed to update cart.');
        }
    };

    /**
     * Elimina un item del carrito de compras de usuario por medio del id
     */
    const handleDeleteItem = async (productId: string) => {
        try {

            await axiosConfig.post('', { query: deleteFromCartMutation, variables: { productId } });

            message.success('Item removed from cart!');

            fetchCart();

            setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
        } catch (err) {
            message.error('Failed to remove item from cart.');
        }
    };

    /**
     * Elimina todos los items de carrito del usuario
     */
    const handleClearCart = async () => {
        try {

            await axiosConfig.post('', { query: clearCartMutation });
            message.success('Cart cleared successfully!');
            setCartItems([]);
        } catch (err) {
            message.error('Failed to clear cart.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Button type="primary" danger onClick={handleClearCart} style={{ marginBottom: '16px' }}>
                Clear Cart
            </Button>
            <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <InputNumber
                                min={1}
                                defaultValue={item.quantity}
                                onChange={(value) => handleUpdateQuantity(item.product._id, value)}
                            />,
                            <Button danger onClick={() => handleDeleteItem(item.product._id)}>
                                Remove
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.product.name}
                            description={`Price: $${item.product.price} x ${item.quantity}`}
                        />
                    </List.Item>

                )}
            />

                <div style={{ marginTop: '16px', borderTop: '2px solid #ccc', paddingTop: '8px' }}>
                    Total Price: ${cartTotalPrice.toFixed(2)} | Total Quantity: {cartTotalQuantity}
                </div>
        </>

        
    );
};

export default Cart;