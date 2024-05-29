import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RedirectAuth from './RedirectAuth';
import { registerUserMutation } from '../queriesAndMutations/users';


const Register: React.FC = () => {
    RedirectAuth();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            
            const response = await axios.post('http://localhost:37111/graphql', {
                query: registerUserMutation,
                variables: {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }
            });

            const { data } = response; 

            if (data.data.register) {

                message.success('Registration successful!');
                form.resetFields();
                navigate('/login');
            } else {
                message.error('Registration failed!');
            }
        } catch (error) {
            console.error('Registration error:', error);
            message.error('Registration failed!'); 
        }

    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 400, margin: '0 auto' }}
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
