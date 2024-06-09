// useCars.ts

import { useEffect, useState } from 'react';
import {
  deleteCarById,
  getAllCars,
  getCarsByCategory,
  getCarsByName,
  getCarById,
  updateCarById,
} from '../services/carServices';

export interface Car {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  startRent: string | null;
  finishRent: string | null;
  updatedAt: string | null;
}

const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const carsData = await getAllCars();
      if (Array.isArray(carsData)) {
        setCars(carsData);
      } else if (carsData && carsData.data && Array.isArray(carsData.data)) {
        setCars(carsData.data);
      } else {
        console.error(
          'Data received from server is not in the expected format:',
          carsData
        );
        setError('Invalid data received from server');
      }
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setLoading(false);
    }
  };

  const filterCarsByCategory = async (category: string) => {
    try {
      if (category === '') {
        fetchCars();
      } else {
        const filteredCarsData = await getCarsByCategory(category);
        if (
          filteredCarsData &&
          filteredCarsData.data &&
          Array.isArray(filteredCarsData.data.cars)
        ) {
          setCars(filteredCarsData.data.cars);
        } else {
          console.error(
            'Data received from server is not in the expected format:',
            filteredCarsData
          );
          setError('Invalid data received from server');
        }
      }
    } catch (error) {
      setError('Failed to fetch cars data by category');
    }
  };

  const filterCarsByName = async (name: string) => {
    try {
      const filteredCarsData = await getCarsByName(name);
      if (
        filteredCarsData &&
        filteredCarsData.data &&
        Array.isArray(filteredCarsData.data.cars)
      ) {
        setCars(filteredCarsData.data.cars);
      } else {
        console.error(
          'Data received from server is not in the expected format:',
          filteredCarsData
        );
        setError('Invalid data received from server');
      }
    } catch (error) {
      setError('Failed to fetch cars data by name');
    }
  };

  const fetchCarById = async (id: string) => {
    try {
      const carData = await getCarById(id);
      return carData.data;
      console.log(carData.data);
    } catch (error) {
      setError('Failed to fetch car data by ID');
      return null;
    }
  };

  const updateCar = async (id: string, formData: FormData) => {
    try {
      const updatedCar = await updateCarById(id, formData);
      return updatedCar;
    } catch (error) {
      setError('Failed to update car');
      return null;
    }
  };

  const deleteCar = async (id: string) => {
    try {
      const response = await deleteCarById(id);
      console.log(response);
      if (response.status === 200) {
        setCars((prevCars) => prevCars.filter((car) => car.id !== id));
      } else {
        setError('Failed to delete car');
      }
    } catch (error) {
      setError('Failed to delete car');
    }
  };

  return {
    cars,
    loading,
    error,
    filterCarsByCategory,
    filterCarsByName,
    fetchCarById,
    updateCar,
    deleteCar,
  };
};

export default useCars;
