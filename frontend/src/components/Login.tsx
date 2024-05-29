import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RedirectAuth from './RedirectAuth';
import { logingUserMutation } from '../queriesAndMutations/users';

interface LoginProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
    RedirectAuth();

    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {

            const response = await axios.post('http://localhost:37111/graphql', {
                query: logingUserMutation,
                variables: {
                    email: values.email,
                    password: values.password,
                }
            });

            const { data } = response; 

            if (data.data) {
                localStorage.setItem('jwt', data.data.login);
                message.success('Login successful!');
                setIsAuthenticated(true);
                form.resetFields();
                navigate('/main');
            } else {
                const errorMessage = data.errors[0].message || 'Login failed!'; 
                message.error(errorMessage);
            }
        } catch (error) {
            console.error('Login error:', error);
            message.error('Login failed!'); 
        }
    };

    return (
        <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 400, margin: '0 auto' }}
        >
            <Form.Item
                name="email"
                label="Email"
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
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
