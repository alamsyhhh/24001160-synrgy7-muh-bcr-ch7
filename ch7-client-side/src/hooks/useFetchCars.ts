import { useEffect, useState } from 'react';
import { Car, DriverType } from '../types/carTypes';

const useFetchCars = (): [Car[], boolean] => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json'
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedCars = data.map((car: Car) => {
          const randomDaysToAdd = Math.floor(Math.random() * 7);
          const currentDate = new Date();
          const availableDate = new Date(currentDate);
          availableDate.setDate(currentDate.getDate() + randomDaysToAdd);
          const randomHour = Math.floor(Math.random() * 24);
          availableDate.setUTCHours(randomHour);

          // Convert UTC time to WIB time (UTC +7 hours)
          const wibDate = new Date(
            availableDate.getTime() + 7 * 60 * 60 * 1000
          );

          console.log('UTC Time:', availableDate.toISOString());
          console.log('WIB Time:', wibDate.toISOString());

          return {
            ...car,
            driverType:
              Math.random() > 0.5
                ? DriverType.WithDriver
                : DriverType.WithoutDriver,
            availableAt: wibDate.toISOString(),
          };
        });
        setCars(updatedCars);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
        setLoading(false);
      });
  }, []);

  return [cars, loading];
};

export default useFetchCars;
