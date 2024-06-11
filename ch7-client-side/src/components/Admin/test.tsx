// CarDashboardPage.tsx

import React, { useState, useEffect } from 'react';
import feather from 'feather-icons';
import Dashboard from '../../section/Admin/dashboardSection';
import CarCardComponent from '../../components/Admin/carCardComponent2';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import useCars, { Car } from '../../hooks/useCars';
import CarFilterButton from '../../components/Admin/buttonOutlineComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ToastComponent from '../../components/Admin/toastContainer'; // Import ToastComponent

const CarDashboardPage: React.FC = () => {
  const {
    cars,
    loading,
    error,
    filterCarsByCategory,
    filterCarsByName,
    deleteCar,
  } = useCars();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchedCars, setSearchedCars] = useState<Car[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('name');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState<boolean>(false); // State for controlling toast visibility
  const [toastMessage, setToastMessage] = useState<string>(''); // State for toast message

  useEffect(() => {
    feather.replace();
  }, [cars]);

  useEffect(() => {
    if (searchQuery) {
      filterCarsByName(searchQuery);
    } else {
      filterCarsByCategory(activeFilter || '');
    }
  }, [activeFilter, filterCarsByCategory, filterCarsByName, searchQuery]);

  useEffect(() => {
    if (location.state && location.state.message) {
      setToastMessage(location.state.message);
      setShowToast(true); // Show the toast
      setTimeout(() => setShowToast(false), 5000); // Hide the toast after 5 seconds
      // Clear the state to prevent showing the toast again on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === 'All' ? null : filter);
    filterCarsByCategory(filter);
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchedCars(cars);
    } else {
      setSearchedCars([]);
    }
  }, [cars, searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const activePage = 'cars';
  const breadcrumbs = ['Cars', 'List Cars'];

  return (
    <Dashboard
      activePage={activePage}
      content={
        <>
          <ToastComponent
            show={showToast}
            onClose={() => setShowToast(false)}
            message={toastMessage} // Pass the message from the API response to ToastComponent
          />
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
              <h4>List Cars</h4>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/addcardashboard')}
              >
                + Add New Car
              </button>
            </div>

            <div className="sizee">
              <CarFilterButton
                label="All"
                onClick={() => handleFilterClick('')}
                isActive={!activeFilter}
              />
              <CarFilterButton
                label="Small"
                onClick={() => handleFilterClick('Small')}
                isActive={activeFilter === 'Small'}
              />
              <CarFilterButton
                label="Medium"
                onClick={() => handleFilterClick('Medium')}
                isActive={activeFilter === 'Medium'}
              />
              <CarFilterButton
                label="Large"
                onClick={() => handleFilterClick('Large')}
                isActive={activeFilter === 'Large'}
              />
            </div>

            <div className="row">
              {(searchQuery ? searchedCars : cars).map((car: Car) => (
                <CarCardComponent
                  key={car.id}
                  car={car}
                  onDelete={deleteCar}
                  onUpdate={() => navigate(`/updatecardashboard?id=${car.id}`)}
                />
              ))}
            </div>
          </div>
        </>
      }
    />
  );
};

export default CarDashboardPage;
