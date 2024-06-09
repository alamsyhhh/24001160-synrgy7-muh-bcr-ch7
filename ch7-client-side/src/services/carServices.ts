import axios from 'axios';
import { BASE_URL } from '../config';

const URL = `${BASE_URL}/cms/cars`;

const getAuthConfig = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Token not found in local storage');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllCars = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(URL, config);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch cars data');
  }
};

export const getCarsByCategory = async (category: string) => {
  try {
    const config = {
      ...getAuthConfig(),
      params: { category },
    };
    const response = await axios.get(URL, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cars data by category');
  }
};

export const getCarsByName = async (name: string) => {
  try {
    const config = {
      ...getAuthConfig(),
      params: { name },
    };
    const response = await axios.get(URL, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cars data by name');
  }
};
