import { useEffect, useState } from 'react';
import { Car, getPaginatedCars } from '../services/carServices';

const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchPaginatedCars();
  }, [page, pageSize]);

  const fetchPaginatedCars = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedCars(page, pageSize);
      setCars(response.data.cars);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  return {
    cars,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    fetchPaginatedCars,
  };
};

export default useCars;
