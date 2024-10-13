import { DocumentReference, Timestamp } from "firebase/firestore";

export type Car = {
  id: string;
  make: string;
  model: string;
  vin: string;
  admissionDate: Timestamp;

  clientId?: string;
  services: CarServiceDto[];
};

export type CarDto = {
  make: string;
  model: string;
  vin: string;
  admissionDate: Timestamp;

  clientId?: string;
  services: Service[];
};

export type ClientDto = {
  id: string;
  firstName: string;
  secondName?: string;
  phoneNumber: number;
  nip?: string;

  cars: CarDto[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  ref?: DocumentReference;
};

export type ServiceDto = {
  name: string;
  description: string;
  price: number;
};

export interface CarServiceDto extends ServiceDto {
  done: boolean;
  startDate?: Timestamp;
  executeDate?: Timestamp;
}

export type MagazineDto = {
  id: string;
  elements: CarElementDto[];
};

export type CarElementDto = {
  id: string;
  name: string;
  description: string;
  inUse: boolean;
  price: number;
};

export type OrderElementDto = {
  id: string;
  name: string;
  description: string;
  price?: number;
  received: boolean;
  engineNumber?: string;
  make?: string;
  model?: string;
};
