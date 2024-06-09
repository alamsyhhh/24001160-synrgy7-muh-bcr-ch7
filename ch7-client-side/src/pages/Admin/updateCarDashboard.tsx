// Inside UpdateCarPage component

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from '../../section/Admin/dashboardSection';
import FormAddComponent from '../../components/Admin/formAddComponent';
import Breadcrumb from '../../components/Admin/breadcrumbComponent';
import useCars, { Car } from '../../hooks/useCars';

const UpdateCarPage: React.FC = () => {
  const { fetchCarById } = useCars();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get('id');
  const [carData, setCarData] = useState<Car | null>(null);

  useEffect(() => {
    if (carId) {
      fetchCarById(carId)
        .then((data) => {
          if (data) {
            setCarData(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching car data:', error);
        });
    }
  }, [carId, fetchCarById]);

  if (!carData) return <div>Loading...</div>;

  return (
    <Dashboard
      activePage="cars"
      content={
        <>
          <Breadcrumb
            breadcrumbs={[
              'Cars',
              <Link to="/cardashboard" key="list-cars">
                List Cars
              </Link>,
              'Update Car',
            ]}
          />
          <h4>Update Car</h4>
          <FormAddComponent carData={carData} />
        </>
      }
    />
  );
};

export default UpdateCarPage;
