import axios from 'axios';
import { BASE_URL } from '../config';

interface LoginResponse {
  status: number;
  message: string;
  data: {
    user: {
      username: string;
      role: string;
    };
    token: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
