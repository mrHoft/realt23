import type { PropertyType } from "../interfaces/property.interface";

export const PROPERTY_TYPES: { value: PropertyType, label: string }[] = [
  { value: 'All', label: 'Все' },
  { value: 'House', label: 'Дом' },
  { value: 'Apartment', label: 'Квартира' },
  { value: 'NRA', label: 'Аппартаменты' },
  { value: 'Condo', label: 'Доля' },
  { value: 'Townhouse', label: 'Таунхаус' },
  { value: 'Land', label: 'Участок' }
] as const;

export const PRICE_OPTIONS: { value: string, label: string }[] = [
  { value: '0', label: 'Нет' },
  { value: '250000', label: '250т' },
  { value: '500000', label: '500т' },
  { value: '750000', label: '750т' },
  { value: '1000000', label: '1м' },
  { value: '2000000', label: '2м' },
  { value: '5000000', label: '5м' },
  { value: '10000000', label: '10м+' }
] as const;

export const PRICE_RANGE_OPTIONS: { value: string, label: string }[] = [
  { value: '0', label: 'Нет' },
  { value: '0-250000', label: 'до 250т' },
  { value: '250000-500000', label: '250т - 500т' },
  { value: '500000-750000', label: '500т - 750т' },
  { value: '750000-1000000', label: '750т - 1м' },
  { value: '1000000-2000000', label: '1м - 2м' },
  { value: '2000000-5000000', label: '2м - 5м' },
  { value: '5000000+', label: '5м+' }
] as const;
