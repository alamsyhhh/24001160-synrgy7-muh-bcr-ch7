export interface Car {
  id: string;
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  available: boolean;
  type: string;
  year: number;
  options: string[];
  specs: string[];
  availableAt: string;
  driverType: DriverType;
}

export enum DriverType {
  WithDriver = 'with driver',
  WithoutDriver = 'without driver',
}

export interface CarAdmin {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  startRent: string | null;
  finishRent: string | null;
  createdAt: string;
  updatedAt: string;
}
