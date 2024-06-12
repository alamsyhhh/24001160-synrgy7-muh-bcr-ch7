import { useContext } from 'react';
import { CarsContextType, CarsContext } from '../contexts/carsContext';

export const useCarsContext = (): CarsContextType => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error('useCarsContext must be used within a CarsProvider');
  }
  return context;
};
