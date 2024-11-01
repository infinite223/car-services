import { Timestamp } from "firebase/firestore";

export type CarCreateDto = {
  make: string;
  model: string;
  vin: string;
  admissionDate: Timestamp;

  clientId?: string;
  services: CarServiceCreateDto[];
};

export type ClientCreateDto = {
  firstName: string;
  secondName?: string;
  phoneNumber: number;
  nip?: string;

  cars: CarCreateDto[];
};

export type ServiceCreateDto = {
  name: string;
  description: string;
  price: number;
};

export interface CarServiceCreateDto extends ServiceCreateDto {
  done: boolean;
  startDate?: Timestamp;
  executeDate?: Timestamp;
}

/////// IN PROGRESS

export type MagazineCreateDto = {
  id: string;
  elements: CarElementCreateDto[];
};

export type CarElementCreateDto = {
  id: string;
  name: string;
  description: string;
  inUse: boolean;
  price: number;
};

export type OrderElementCreateDto = {
  id: string;
  name: string;
  description: string;
  price?: number;
  received: boolean;
  engineNumber?: string;
  make?: string;
  model?: string;
};
