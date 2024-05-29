import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Contiene la funcionalidad para redireccionar al Componente Main cuando
 * existe el token jwt en localStorage
 */
const RedirectAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      navigate('/main');
    }
  }, [navigate]);
};

export default RedirectAuth;
