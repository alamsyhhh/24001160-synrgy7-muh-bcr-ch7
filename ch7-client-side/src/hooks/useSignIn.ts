import { useState } from 'react';
import { login as loginService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginService(email, password);
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        setSuccess(true);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success, setError, setSuccess };
};
