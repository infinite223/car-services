import { DocumentReference, Timestamp } from "firebase/firestore";

export type Car = {
  id: string;
  make: string;
  model: string;
  vin: string;
  admissionDate: Timestamp;

  clientId?: string;
  services: CarService[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  ref?: DocumentReference;
};

export interface CarService {
  id: string;
  name: string;
  description: string;
  price: number;
  done: boolean;
  startDate?: Timestamp;
  executeDate?: Timestamp;
}

export type User = {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
};
