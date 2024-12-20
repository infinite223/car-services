import { OrderElementCreateDto } from "../modules/car-services/api.models";
import { Service } from "../modules/car-services/models";

export const orders: OrderElementCreateDto[] = [
  {
    id: "1",
    name: "Silnik",
    price: 5005,
    description: "Silnik benzynowy 2.0L",
    received: false,
  },
  {
    id: "2",
    name: "Skrzynia biegów",
    price: 3000,
    description: "Manualna skrzynia biegów 6-stopniowa",
    received: false,
  },
  {
    id: "3",
    name: "Zawieszenie",
    price: 2000,
    description: "Zawieszenie przednie i tylne sportowe",
    received: false,
  },
  {
    id: "4",
    name: "Układ hamulcowy",
    price: 1500,
    description: "Tarcze i klocki hamulcowe ceramiczne",
    received: false,
  },
  {
    id: "5",
    name: "Koła",
    price: 1200,
    description: "Komplet felg aluminiowych 18 cali",
    received: false,
  },
  {
    id: "6",
    name: "Akumulator",
    price: 400,
    description: "Akumulator 12V 70Ah",
    received: false,
  },
  {
    id: "7",
    name: "Alternator",
    price: 600,
    description: "Alternator 12V 150A",
    received: false,
  },
  {
    id: "8",
    name: "Chłodnica",
    price: 900,
    description: "Chłodnica silnika z wentylatorem",
    received: false,
  },
  {
    id: "9",
    name: "Układ wydechowy",
    price: 1300,
    description: "Sportowy układ wydechowy z tłumikiem",
    received: false,
  },
  {
    id: "10",
    name: "Turbosprężarka",
    price: 2500,
    description: "Turbosprężarka wysokoprężna",
    received: false,
  },
  {
    id: "11",
    name: "Rozrusznik",
    price: 700,
    description: "Rozrusznik 12V 1.4kW",
    received: false,
  },
  {
    id: "12",
    name: "Pompa paliwa",
    price: 450,
    description: "Elektryczna pompa paliwa",
    received: false,
  },
  {
    id: "13",
    name: "Klimatyzacja",
    price: 2000,
    description: "System klimatyzacji automatycznej",
    received: false,
  },
  {
    id: "14",
    name: "Czujniki parkowania",
    price: 300,
    description: "Zestaw czujników parkowania z kamerą cofania",
    received: false,
  },
  {
    id: "15",
    name: "Wtryskiwacze",
    price: 1200,
    description: "Wtryskiwacze paliwa wysokociśnieniowe",
    received: false,
  },
  {
    id: "16",
    name: "Szyby",
    price: 800,
    description: "Szyby przednie i boczne odporne na uderzenia",
    received: false,
  },
];

export const services: Service[] = [
  {
    id: "1",
    name: "Wymiana oleju",
    price: 120,
    description: "",
  },
  {
    id: "2",
    name: "Wymiana rozrządu",
    price: 600,
    description: "Wymiana całego kąpletnego rozrządu",
  },
  {
    id: "3",
    name: "Zmiana opeon",
    price: 70,
    description: "",
  },
  {
    id: "4",
    name: "Podstawowa diagnostyka",
    price: 200,
    description: "",
  },
];
