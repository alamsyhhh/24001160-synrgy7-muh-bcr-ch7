import React, { useState, useEffect } from 'react';
import feather from 'feather-icons';
import Dashboard from '../../section/Admin/dashboardSection';
import CarCardComponent from '../../components/Admin/carCardComponent2';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import useCars, { Car } from '../../hooks/useCars';
import CarFilterButton from '../../components/Admin/buttonOutlineComponent';
import { useLocation } from 'react-router-dom';

const CarDashboardPage: React.FC = () => {
  const { cars, loading, error, filterCarsByCategory, filterCarsByName } =
    useCars();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchedCars, setSearchedCars] = useState<Car[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('name');

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
          <Breadcrumb breadcrumbs={breadcrumbs} />
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>List Cars</h4>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => console.log('+ Add New Car')}
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
                  onDelete={() => console.log('Delete clicked')}
                  onUpdate={() => console.log('Update clicked')}
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
