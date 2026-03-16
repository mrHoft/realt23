export type TCurrency = '₽' | '$' | '€';
export type PropertyType = 'All' | 'House' | 'Apartment' | 'Condo' | 'Townhouse' | 'Land' | 'NRA' /* Non-Residential Apartment */;
export type PropertyStatus = 'Just listed' | 'Sold' | 'Luxury' | 'From developer';

export interface Property {
  id: number;
  title: string;
  price: number;
  currency: TCurrency
  location: string;
  address: string;
  square: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  type: PropertyType;
  description: string;
  images: string[];
  status: PropertyStatus;
  agent: Agent;
  rating: number;
}

export interface Agent {
  name: string;
  photo: string;
}

export interface PropertyFilters {
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
}

export interface Achievement {
  label: string;
  value: string;
}
