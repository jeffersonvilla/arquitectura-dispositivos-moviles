import React, { useEffect, useState } from 'react';
import axiosConfig from '../axiosConfig';
import { List, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { createProductMutation, deleteProductMutation, getProductsQuery, updateProductMutation } from '../queriesAndMutations/products';

/**
 * Componente para listar los productos en base de datos
 * Con funcionalidad para Crear, Actualizar y Eliminar productos
 * 
 * Emplea los query y mutaciones definidos en el folder queriesAndMutations (products)
 */
const AdminProductList: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleUpdate, setVisibleUpdate] = useState<boolean>(false);
    const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [formCreate] = Form.useForm();


    /**
     * Trae todos los productos de la base de datos
     */
    const fetchProducts = async () => {
        try {

            //Realiza el request (sin pasar token jwt) 
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
     * Elimina un producto usando el id
     */
    const handleDeleteProduct = async (productId: string) => {
        try {

            await axiosConfig.post('', { query: deleteProductMutation, variables: { productId } });
            message.success('Product deleted successfully!');
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (err) {
            message.error('Failed to delete product.');
        }
    };

    /** 
     * Actualiza un producto con los valores recibidos del formulario
    */
    const handleUpdateProduct = async (values: any) => {
        try {

            await axiosConfig.post('', {
                query: updateProductMutation,
                variables: { productId: values.productId, name: values.name, price: parseFloat(values.price),
                    category: values.category, stock: parseInt(values.stock)
                 }
            });

            message.success('Product updated successfully!');
            setVisibleUpdate(false);
        } catch (err) {
            message.error('Failed to update product.');
        }
    };

    const showModalUpdate = (product: any) => {
        form.setFieldsValue({ ...product, productId: product._id });
        setVisibleUpdate(true);
    };

    const handleCancelUpdate = () => {
        setVisibleUpdate(false);
    };

    /**
     * Crea un nuevo producto con los valores recibidos del formulario
     */
    const handleCreateProduct = async (values: any) => {
        try {

          await axiosConfig.post('', { query: createProductMutation,
            variables: { name: values.name,  price: parseFloat(values.price),
                category: values.category, stock: parseInt(values.stock) },
          });

          message.success('Product created successfully!');
          setVisibleCreate(false);
          
          fetchProducts();

        } catch (err) {
          message.error('Failed to create product.');
        }
      };
    
      const showModalCreate = () => {
        setVisibleCreate(true);
      };

      const handleCancelCreate = () => {
        setVisibleCreate(false);
      };

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <Button type="primary" onClick={showModalCreate}>Add Product</Button>
            </div>

            <List
                style={{ width: '100%' }}
                itemLayout="horizontal"
                dataSource={products}
                renderItem={(product: any) => (
                    <List.Item
                        actions={[
                            <Button onClick={() => showModalUpdate(product)}>Edit</Button>,
                            <Button danger onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
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

            <Modal
                title="Edit Product"
                visible={visibleUpdate}
                onCancel={handleCancelUpdate}
                footer={null}
            >
                <Form form={form} onFinish={handleUpdateProduct} initialValues={{}}>
                    <Form.Item name="productId" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter product price' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please enter product category' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Please enter product stock' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Update</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Create Product"
                visible={visibleCreate}
                onCancel={handleCancelCreate}
                footer={null}
            >
                <Form form={formCreate} onFinish={handleCreateProduct} initialValues={{}}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter product price' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please enter product category' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Please enter product stock' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AdminProductList;
