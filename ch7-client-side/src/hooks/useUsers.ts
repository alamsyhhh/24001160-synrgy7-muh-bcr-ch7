import { useEffect, useState } from 'react';
import { User, getPaginatedUsers } from '../services/userService';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchPaginatedUsers();
  }, [page, pageSize]);

  const fetchPaginatedUsers = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedUsers(page, pageSize);
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    fetchPaginatedUsers,
  };
};

export default useUsers;
