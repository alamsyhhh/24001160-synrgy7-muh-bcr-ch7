import React, { createContext } from 'react';
import { useState, useCallback, useEffect } from 'react';
import {
  deleteCarById,
  getAllCars,
  getCarsByCategory,
  getCarsByName,
  getCarById,
  updateCarById,
  createCar as createCarService,
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

export interface CarsContextType {
  cars: Car[];
  loading: boolean;
  error: string | null;
  toastMessage: string;
  fetchCars: () => void;
  filterCarsByCategory: (category: string) => void;
  filterCarsByName: (name: string) => void;
  fetchCarById: (id: string) => Promise<Car | null>;
  createCar: (formData: FormData) => Promise<unknown>;
  updateCar: (id: string, formData: FormData) => Promise<unknown>;
  deleteCar: (id: string) => Promise<void>;
}

// Export CarsContext di sini
export const CarsContext = createContext<CarsContextType | undefined>(
  undefined
);

export const CarsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  const fetchCars = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const filterCarsByCategory = useCallback(
    async (category: string) => {
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
    },
    [fetchCars]
  );

  const filterCarsByName = useCallback(async (name: string) => {
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
  }, []);

  const fetchCarById = async (id: string) => {
    try {
      const carData = await getCarById(id);
      return carData.data;
    } catch (error) {
      setError('Failed to fetch car data by ID');
      return null;
    }
  };

  const createCar = async (formData: FormData): Promise<unknown> => {
    try {
      const newCar = await createCarService(formData);
      const { message } = newCar.data || {};
      setToastMessage(message || 'Data Berhasil Disimpan');
      return newCar;
    } catch (error) {
      setError('Failed to create car');
      return null;
    }
  };

  const updateCar = async (id: string, formData: FormData) => {
    try {
      const updatedCar = await updateCarById(id, formData);
      const { message } = updatedCar.data || {};
      setToastMessage(message || 'Car successfully updated!');
      return updatedCar;
    } catch (error) {
      setError('Failed to update car');
      return null;
    }
  };

  const deleteCar = async (id: string) => {
    try {
      const response = await deleteCarById(id);
      if (response.status === 200) {
        setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        const { message } = response.data || {};
        setToastMessage(message || 'Data Berhasil Dihapus');
      } else {
        setError('Failed to delete car');
      }
    } catch (error) {
      setError('Failed to delete car');
    }
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        loading,
        error,
        toastMessage,
        fetchCars,
        filterCarsByCategory,
        filterCarsByName,
        fetchCarById,
        createCar,
        updateCar,
        deleteCar,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
