import React, { useEffect, useState } from 'react';
import Dashboard from '../../section/Admin/dashboardSection';
import CarTable from '../../components/Admin/tableCarsComponent';
import UserTable from '../../components/Admin/userTableComponent';
import { Car, getPaginatedCars } from '../../services/carServices';
import useUsers from '../../hooks/useUsers';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import feather from 'feather-icons';

const DashboardPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const {
    users,
    loading: userLoading,
    error: userError,
    page: userPage,
    pageSize: userPageSize,
    totalPages: userTotalPages,
    setPage: setUserPage,
    setPageSize: setUserPageSize,
  } = useUsers();

  const breadcrumbs = ['Dashboard', 'Dashboard'];

  useEffect(() => {
    feather.replace();
  }, [cars]);

  useEffect(() => {
    fetchCars();
  }, [page, pageSize]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedCars(page, pageSize);
      setCars(response.data.cars);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
      setLoading(false);
    }
  };

  return (
    <Dashboard
      activePage="dashboard"
      content={
        <>
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <h4 className="mt-5">Dashboard</h4>
          <CarTable
            cars={cars}
            loading={loading}
            error={error}
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            setPage={setPage}
            setPageSize={setPageSize}
          />
          <UserTable
            users={users}
            loading={userLoading}
            error={userError}
            page={userPage}
            pageSize={userPageSize}
            totalPages={userTotalPages}
            setPage={setUserPage}
            setPageSize={setUserPageSize}
          />
        </>
      }
    />
  );
};

export default DashboardPage;
