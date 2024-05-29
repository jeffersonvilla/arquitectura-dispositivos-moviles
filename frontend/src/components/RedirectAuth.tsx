import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
