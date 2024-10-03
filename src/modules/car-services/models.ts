export type CarDto = {
  id: string;
  make: string;
  model: string;

  clientId?: string;
  services: ServiceDto[];
};

export type ClientDto = {
  id: string;
  firstName: string;
  secondName?: string;
  phoneNumber: number;
  nip?: string;

  cars: CarDto[];
};

export type ServiceDto = {
  id: string;
  name: string;
  price: number;
};

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
