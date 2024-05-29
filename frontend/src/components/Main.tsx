import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import { jwtDecode } from 'jwt-decode';
import Cart from './Cart';
import AdminProductList from './AdminProductList';

/**
 * Componente usado para mostrar la funcionalidad segun el tipo de usuario
 * 
 * Decodifica el token jwt y en base a la información resultante
 * muestra el componente Cart si el usuario tiene rol 'user'
 * O muestra el componente AdminProductList si el usuario es 'admin'
 * 
 */
const Main: React.FC = () => {

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const navigate = useNavigate();

  /**
   * Decodifica el token jwt para conocer el rol del usuario
   */
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
