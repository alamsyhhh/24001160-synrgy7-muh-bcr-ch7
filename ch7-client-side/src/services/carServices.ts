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

export const deleteCarById = async (id: string) => {
  try {
    const config = getAuthConfig();
    const response = await axios.delete(`${URL}/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete car');
  }
};

export const getCarById = async (id: string) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${URL}/${id}`, config);
    return response.data;
    console.log(response.data);
  } catch (error) {
    throw new Error('Failed to fetch car data by ID');
  }
};

export const updateCarById = async (id: string, formData: FormData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(`${URL}/${id}`, formData, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update car');
  }
};

export const createCar = async (formData: FormData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.post(URL, formData, config);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create car');
  }
};

export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  startRent: string | null;
  finishRent: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCarsResponse {
  status: number;
  message: string;
  data: {
    cars: Car[];
    totalPages: number;
  };
}

export const getPaginatedCars = async (
  page: number,
  pageSize: number
): Promise<PaginatedCarsResponse> => {
  const response = await axios.get<PaginatedCarsResponse>(
    `${BASE_URL}/cms/cars`,
    {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};
