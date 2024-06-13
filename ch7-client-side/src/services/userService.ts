import axios from 'axios';
import { BASE_URL } from '../config';

const USER_URL = `${BASE_URL}/cms/users`;

const getAuthConfig = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found in local storage');
    throw new Error('Token not found in local storage');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface PaginatedUsersResponse {
  status: number;
  message: string;
  data: {
    users: User[];
    totalPages: number;
  };
}

export const getPaginatedUsers = async (
  page: number,
  pageSize: number
): Promise<PaginatedUsersResponse> => {
  const config = {
    params: { page, pageSize },
    ...getAuthConfig(),
  };

  try {
    const response = await axios.get<PaginatedUsersResponse>(USER_URL, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      throw new Error('Only Super Admins can access users data.');
    } else if (axios.isAxiosError(error)) {
      throw new Error(
        `Request failed with status ${error.response?.status}: ${error.response?.statusText}`
      );
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
