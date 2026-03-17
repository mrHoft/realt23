import { Injectable } from '@angular/core';
import type { Property, PropertyFilters } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private dummyPropertiesData: Property[] = [
    {
      id: 1,
      title: 'Современная белая вилла',
      price: 26000000,
      currency: '₽',
      location: 'Центр',
      address: 'ул. Красная, 123, Краснодар, 350000',
      square: 240,
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2023,
      type: 'House',
      description: 'Потрясающая современная архитектура с чистыми линиями и обширными стеклянными стенами. Просторная гостиная открытой планировки, кухня для шеф-повара и частный двор-оазис.',
      images: [
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg',
        '/images/16a97b1bc-d1f7-457e-b9f1-9deacbca32bd.jpg'
      ],
      status: 'Just listed',
      agent: { name: 'Дмитрий Кузнецов', photo: '/avatar/a042581f4e29026024d.jpg' },
      rating: 5
    },
    {
      id: 2,
      title: 'Элитный пентхаус в центре',
      price: 43000000,
      currency: '₽',
      location: 'Комсомольский',
      address: 'Комсомольский микрорайон, 45, Краснодар, 350001',
      square: 180,
      bedrooms: 2,
      bathrooms: 2.5,
      yearBuilt: 2021,
      type: 'Apartment',
      description: 'Испытайте роскошную жизнь в этом захватывающем пентхаусе. Панорамные окна от пола до потолка открывают вид на город. Частный лифт.',
      images: [
        '/images/16514d781-a354-4ec8-94ba-14779f7ca0fd.jpg',
        '/images/18a1f33a8-8b85-48db-9a88-c938df532899.jpg'
      ],
      status: 'Luxury',
      agent: { name: 'Светлана Ковалева', photo: '/avatar/a042581f4e29026704d.jpg' },
      rating: 5
    },
    {
      id: 3,
      title: 'Уютный семейный дом',
      price: 8000000,
      currency: '₽',
      location: 'Черёмушки',
      address: 'ул. Московская, 78, Краснодар, 350002',
      square: 120,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2018,
      type: 'House',
      description: 'Идеально подходит для растущей семьи. Просторный двор, современная кухня, расположение в районе с лучшими школами.',
      images: [
        '/images/16a97b1bc-d1f7-457e-b9f1-9deacbca32bd.jpg',
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg'
      ],
      status: 'From developer',
      agent: { name: 'Анна Волкова', photo: '/avatar/a04258114e29026304d.jpg' },
      rating: 4
    },
    {
      id: 4,
      title: 'Минималистичная студия',
      price: 3450000,
      currency: '₽',
      location: 'Российская',
      address: 'ул. Российская, 156, Краснодар, 350003',
      square: 36,
      bedrooms: 1,
      bathrooms: 1,
      yearBuilt: 2020,
      type: 'Apartment',
      description: 'Эффективное и стильное жилье в центре города. Высокие потолки, полированные бетонные полы, система умный дом.',
      images: [
        '/images/16514d781-a354-4ec8-94ba-14779f7ca0fd.jpg'
      ],
      status: 'Sold',
      agent: { name: 'Светлана Ковалева', photo: '/avatar/a042581f4e29026704d.jpg' },
      rating: 5
    },
    {
      id: 5,
      title: 'Таунхаус с террасой',
      price: 12500000,
      currency: '₽',
      location: 'Гидростроителей',
      address: 'ул. Береговая, 23, Краснодар, 350004',
      square: 150,
      bedrooms: 3,
      bathrooms: 2,
      yearBuilt: 2022,
      type: 'Townhouse',
      description: 'Просторный таунхаус с большой террасой и видом на реку. Два парковочных места, отдельный вход.',
      images: [
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg',
        '/images/18a1f33a8-8b85-48db-9a88-c938df532899.jpg'
      ],
      status: 'Just listed',
      agent: { name: 'Татьяна Николаева', photo: '/avatar/a04258114e29026305d.jpg' },
      rating: 5
    },
    {
      id: 6,
      title: 'Престижная квартира в новостройке',
      price: 15700000,
      currency: '₽',
      location: 'Центр',
      address: 'ул. Северная, 67, Краснодар, 350000',
      square: 95,
      bedrooms: 2,
      bathrooms: 1,
      yearBuilt: 2024,
      type: 'Condo',
      description: 'Новостройка в центре города. Подземный паркинг, закрытая территория, современные планировки.',
      images: [
        '/images/16514d781-a354-4ec8-94ba-14779f7ca0fd.jpg',
        '/images/16a97b1bc-d1f7-457e-b9f1-9deacbca32bd.jpg'
      ],
      status: 'From developer',
      agent: { name: 'Игорь Смирнов', photo: '/avatar/a04258114e29026302d.jpg' },
      rating: 5
    },
    {
      id: 7,
      title: 'Земельный участок под застройку',
      price: 5500000,
      currency: '₽',
      location: 'Комсомольский',
      address: 'пер. Светлый, 5, Краснодар, 350001',
      square: 600,
      bedrooms: 0,
      bathrooms: 0,
      yearBuilt: 0,
      type: 'Land',
      description: 'Участок 6 соток под индивидуальное жилищное строительство. Все коммуникации по границе.',
      images: [
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg'
      ],
      status: 'Just listed',
      agent: { name: 'Анна Волкова', photo: '/avatar/a04258114e29026304d.jpg' },
      rating: 4
    },
    {
      id: 8,
      title: 'Нежилое помещение под офис',
      price: 9800000,
      currency: '₽',
      location: 'Российская',
      address: 'ул. Ставропольская, 234, Краснодар, 350003',
      square: 85,
      bedrooms: 0,
      bathrooms: 1,
      yearBuilt: 2019,
      type: 'NRA',
      description: 'Нежилое помещение на 1 этаже жилого дома. Отдельный вход, высокие потолки, подходит под офис или магазин.',
      images: [
        '/images/16514d781-a354-4ec8-94ba-14779f7ca0fd.jpg',
        '/images/18a1f33a8-8b85-48db-9a88-c938df532899.jpg'
      ],
      status: 'Sold',
      agent: { name: 'Ирина Кокина', photo: '/avatar/a04258114e29026303d.jpg' },
      rating: 5
    },
    {
      id: 9,
      title: 'Дом с сауной и бассейном',
      price: 32500000,
      currency: '₽',
      location: 'Гидростроителей',
      address: 'ул. Речная, 12, Краснодар, 350004',
      square: 320,
      bedrooms: 5,
      bathrooms: 4,
      yearBuilt: 2023,
      type: 'House',
      description: 'Роскошный дом с собственной сауной и крытым бассейном. Ландшафтный дизайн, система охраны.',
      images: [
        '/images/16a97b1bc-d1f7-457e-b9f1-9deacbca32bd.jpg',
        '/images/11730a045-929a-45d1-b8b0-27b4fb237d45.jpg'
      ],
      status: 'Luxury',
      agent: { name: 'Светлана Ковалева', photo: '/avatar/a042581f4e29026704d.jpg' },
      rating: 5
    }
  ];

  getProperties(filters?: PropertyFilters): Promise<Property[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...this.dummyPropertiesData];

        if (filters) {
          if (filters.location) {
            filtered = filtered.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
          }
          if (filters.type && filters.type !== 'All') {
            filtered = filtered.filter(p => p.type === filters.type);
          }
          if (filters.minPrice) {
            filtered = filtered.filter(p => p.price >= filters.minPrice);
          }
          if (filters.maxPrice) {
            filtered = filtered.filter(p => p.price <= filters.maxPrice);
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
