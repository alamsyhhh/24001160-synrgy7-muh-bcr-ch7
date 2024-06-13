import React, { useState, useEffect } from 'react';
import feather from 'feather-icons';
import Dashboard from '../../section/Admin/dashboardSection';
import CarCardComponent from '../../components/Admin/carCardComponent2';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import { Car } from '../../contexts/carsContext';
import { useCarsContext } from '../../hooks/useCars';
import CarFilterButton from '../../components/Admin/buttonOutlineComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import ToastComponent from '../../components/Admin/toastContainer';
import ToastComponentBlack from '../../components/Admin/toastComponentBlack';
import ShimmerCard from '../../components/Admin/carCardPlaceholder';

const CarDashboardPage: React.FC = () => {
  const { cars, loading, filterCarsByCategory, filterCarsByName, deleteCar } =
    useCarsContext();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchedCars] = useState<Car[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('name');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<
    'success' | 'delete' | 'not-found'
  >('success');
  const [showDeleted, setShowDeleted] = useState<boolean>(false);
  const [isActiveShowDeleted, setIsActiveShowDeleted] =
    useState<boolean>(false);
  const [searchNotFound, setSearchNotFound] = useState<boolean>(false);

  useEffect(() => {
    feather.replace();
  }, [cars]);

  useEffect(() => {
    if (searchQuery) {
      filterCarsByName(searchQuery, showDeleted);
    } else {
      filterCarsByCategory(activeFilter || '', showDeleted);
    }
  }, [
    activeFilter,
    filterCarsByCategory,
    filterCarsByName,
    searchQuery,
    showDeleted,
  ]);

  useEffect(() => {
    if (location.state && location.state.message) {
      setToastMessage(location.state.message);
      setToastType('success');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (searchQuery && searchedCars.length === 0) {
      setToastMessage('No cars found with the specified name.');
      setToastType('not-found');
      setShowToast(true);
      setSearchNotFound(true);
      setTimeout(() => {
        setShowToast(false);
        setSearchNotFound(false);
      }, 5000);
    }
  }, [searchQuery, searchedCars]);

  const handleFilterClick = (filter: string) => {
    if (filter === 'Show Deleted') {
      setShowDeleted(!showDeleted);
      setIsActiveShowDeleted(!showDeleted);
    } else {
      setActiveFilter(filter === 'All' ? null : filter);
      filterCarsByCategory(filter, showDeleted);
      navigate(location.pathname);
    }
  };

  const handleDeleteCar = async (id: string) => {
    await deleteCar(id);
    setToastMessage('Data Berhasil Dihapus');
    setToastType('delete');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const activePage = 'cars';
  const breadcrumbs = [
    { label: 'Cars', path: '/cardashboard' },
    { label: 'List Cars', path: '/cardashboard' },
  ];

  return (
    <Dashboard
      activePage={activePage}
      content={
        <>
          {toastType === 'success' ? (
            <ToastComponent
              show={showToast}
              onClose={() => setShowToast(false)}
              message={toastMessage}
            />
          ) : toastType === 'delete' ? (
            <ToastComponentBlack
              show={showToast}
              onClose={() => setShowToast(false)}
              message={toastMessage}
            />
          ) : toastType === 'not-found' && searchNotFound ? (
            <ToastComponent
              show={showToast}
              onClose={() => setShowToast(false)}
              message={toastMessage}
              variant="warning" // Make sure this matches the prop definition in ToastComponent
            />
          ) : null}
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
                label="Show Deleted"
                onClick={() => handleFilterClick('Show Deleted')}
                isActive={isActiveShowDeleted}
                isWarning={true}
              />
              <CarFilterButton
                label="All"
                onClick={() => handleFilterClick('')}
                isActive={!activeFilter}
                isWarning={false}
              />
              <CarFilterButton
                label="Small"
                onClick={() => handleFilterClick('Small')}
                isActive={activeFilter === 'Small'}
                isWarning={false}
              />
              <CarFilterButton
                label="Medium"
                onClick={() => handleFilterClick('Medium')}
                isActive={activeFilter === 'Medium'}
                isWarning={false}
              />
              <CarFilterButton
                label="Large"
                onClick={() => handleFilterClick('Large')}
                isActive={activeFilter === 'Large'}
                isWarning={false}
              />
            </div>

            <div className="row">
              {loading
                ? Array.from({ length: 6 }, (_, index) => (
                    <ShimmerCard key={index} />
                  ))
                : (searchQuery ? searchedCars : cars)
                    .filter((car: Car) => showDeleted || !car.deletedBy)
                    .map((car: Car) => (
                      <CarCardComponent
                        key={car.id}
                        car={car}
                        onDelete={() => handleDeleteCar(car.id)}
                        onUpdate={() =>
                          navigate(`/updatecardashboard?id=${car.id}`)
                        }
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