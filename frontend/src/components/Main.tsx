import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            {/* Add your main functionality here */}
        </div>
    );
};

export default Main;
