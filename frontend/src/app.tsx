import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';

const { Header, Content } = Layout;

/**
 * Componente que contine la barra de menu con opciones para ir a la 
 * funcionalidad de registrarse, hacer login o logout
 * 
 */
const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    /**
     * Obtiene el token jwt de localStorage 
     * en caso de que exista el token marca el usuario como autenticado
     */
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    /**
     * Remueve el token jwt del localStorage
     * 
     * Marca el usuario como no autenticado
     */
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}> 
                        {!isAuthenticated ? (
                            <>
                                <Menu.Item key="1"><Link to="/"></Link></Menu.Item>                        
                                <Menu.Item key="2"><Link to="/register">Register</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/login">Login</Link></Menu.Item>
                            </>
                        ) : (
                            <Menu.Item key="4" onClick={handleLogout}><Link to="/">Logout</Link>
                                
                            </Menu.Item>
                        )}
                    </Menu>
                </Header>
                <Content style={{ padding: '50px' }}>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
                        <Route path="/main" element={<Main />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;