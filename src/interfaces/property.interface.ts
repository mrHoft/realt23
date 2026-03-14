export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  address: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  type: 'House' | 'Apartment' | 'Condo' | 'Townhouse';
  description: string;
  images: string[];
  status: 'Just listed' | 'Sold' | 'Luxury' | 'From developer';
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
  minPrice: string;
  maxPrice: string;
}

export interface Achievement {
  label: string;
  value: string;
}
