// services/api.service.ts
import { Injectable } from '@angular/core';
import { Property, PropertyFilters } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dummyPropertiesData: Property[] = [
    {
      id: 1,
      title: 'Modern White Villa',
      price: '$1,250,000',
      location: 'Beverly Hills, CA',
      address: '123 Palm Drive, Beverly Hills, CA 90210',
      sqft: 2400,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2023,
      type: 'House',
      description: 'Stunning modern architecture with clean lines and expansive glass walls. Features an open concept living area, chef\'s kitchen, and a private backyard oasis.',
      images: [
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg',
        '/images/16a97b1bc-d1f7-457e-b9f1-9deacbca32bd.jpg'
      ],
      status: 'Just listed',
      agent: { name: 'Sarah Jenkins', photo: '/avatar/a042581f4e29026024d.jpg' },
      rating: 5
    },
    {
      id: 2,
      title: 'Luxury Downtown Penthouse',
      price: '$3,400,000',
      location: 'New York, NY',
      address: '450 5th Avenue, New York, NY 10018',
      sqft: 1800,
      bedrooms: 2,
      bathrooms: 2.5,
      yearBuilt: 2021,
      type: 'Apartment',
      description: 'Experience luxury living at its finest in this breathtaking penthouse. Floor-to-ceiling windows offer panoramic city views. Includes private elevator access.',
      images: [
        '/images/16514d781-a354-4ec8-94ba-14779f7ca0fd.jpg',
        '/images/18a1f33a8-8b85-48db-9a88-c938df532899.jpg'
      ],
      status: 'Luxury',
      agent: { name: 'Michael Chen', photo: '/avatar/a042581f4e29026704d.jpg' },
      rating: 5
    },
    {
      id: 3,
      title: 'Cozy Family Home',
      price: '$850,000',
      location: 'Austin, TX',
      address: '789 Oak Lane, Austin, TX 78701',
      sqft: 2100,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2018,
      type: 'House',
      description: 'Perfect for a growing family, this home features a spacious backyard, updated kitchen, and is located in a top-rated school district.',
      images: [
        '/images/16a97b1bc-d1f7-457e-b9f1-9deacbca32bd.jpg',
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg'
      ],
      status: 'From developer',
      agent: { name: 'Emily Davis', photo: '/avatar/a04258114e29026302d.jpg' },
      rating: 4
    },
    {
      id: 4,
      title: 'Minimalist Studio',
      price: '$450,000',
      location: 'Seattle, WA',
      address: '101 Pine St, Seattle, WA 98101',
      sqft: 600,
      bedrooms: 1,
      bathrooms: 1,
      yearBuilt: 2020,
      type: 'Apartment',
      description: 'Efficient and stylish living in the heart of the city. High ceilings, polished concrete floors, and smart home integration.',
      images: [
        '/images/16514d781-a354-4ec8-94ba-14779f7ca0fd.jpg'
      ],
      status: 'Sold',
      agent: { name: 'David Wilson', photo: '/avatar/a042581f4e29026024d.jpg' },
      rating: 5
    }
  ];

  getProperties(filters?: PropertyFilters): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.dummyPropertiesData];

        if (filters) {
          if (filters.location) {
            filtered = filtered.filter(p =>
              p.location.toLowerCase().includes(filters.location.toLowerCase())
            );
          }
          if (filters.type) {
            filtered = filtered.filter(p =>
              p.type === filters.type
            );
          }
          if (filters.minPrice) {
            const min = parseInt(filters.minPrice.replace(/[^0-9]/g, ''));
            filtered = filtered.filter(p =>
              parseInt(p.price.replace(/[^0-9]/g, '')) >= min
            );
          }
          if (filters.maxPrice) {
            const max = parseInt(filters.maxPrice.replace(/[^0-9]/g, ''));
            filtered = filtered.filter(p =>
              parseInt(p.price.replace(/[^0-9]/g, '')) <= max
            );
          }
        }

        resolve(filtered);
      }, 500);
    });
  }

  getPropertyById(id: number): Promise<Property | undefined> {
    return Promise.resolve(
      this.dummyPropertiesData.find(p => p.id === id)
    );
  }
}
