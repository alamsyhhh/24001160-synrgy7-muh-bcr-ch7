import { useState } from 'react';
import { register as registerService } from '../services/authService';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const response = await registerService(username, email, password);
      if (response.status === 201) {
        setSuccess(true);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success, setError, setSuccess };
};
