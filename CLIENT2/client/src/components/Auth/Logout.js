import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('/api/auth/logout');
        delete axios.defaults.headers.common['Authorization'];
        logout();
        navigate('/');
      } catch (error) {
        console.error('Failed to logout:', error);
        navigate('/');
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
}
