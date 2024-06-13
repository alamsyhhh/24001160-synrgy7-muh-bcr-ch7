export interface CarDTO {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  onPublish: boolean;
  startRent?: Date | string | null;
  finishRent?: Date | string | null;
  createdBy: string;
  updatedBy: string;
  deletedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
