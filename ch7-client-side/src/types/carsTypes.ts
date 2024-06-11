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

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
