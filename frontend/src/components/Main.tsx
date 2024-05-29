import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import { jwtDecode } from 'jwt-decode';
import Cart from './Cart';
import AdminProductList from './AdminProductList';

const Main: React.FC = () => {

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
    } else {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.role === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

    }
  }, [navigate]);


  return (
    <div style={{ padding: '20px', display: 'flex', gap: '16px' }}>
      {isAdmin ? (
        <AdminProductList />
      ) : (
        <>
          <div style={{ flex: 1 }}>
            <h2>Products</h2>
            <ProductList />
          </div>
          <div style={{ flex: 1 }}>
            <h2>Cart</h2>
            <Cart />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
