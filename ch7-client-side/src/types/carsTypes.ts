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
