import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SelectComponent, SelectOption } from '../select/select.component';
import { PROPERTY_TYPES, PRICE_RANGE_OPTIONS } from '../../constants/property.constants';

interface SearchFilters {
  location: string;
  type: string;
  price: string;
}

@Component({
  selector: 'app-search-form',
  imports: [FormsModule, RouterLink, SelectComponent],
  template: `
    <div class="max-w-4xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="location"
          placeholder="Расположение"
          class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        >
        <app-select [(value)]="filters.type" [options]="propertyTypes" placeholder="Тип недвижимости"/>
        <app-select [(value)]="filters.price" [options]="priceOptions" placeholder="Цена"/>
        <button [routerLink]="['/catalog']" [queryParams]="filters" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
          Поиск
        </button>
      </div>
    </div>
  `
})
export class SearchFormComponent {
  protected readonly filters: SearchFilters = {
    location: '',
    type: '',
    price: ''
  };

  protected readonly propertyTypes: SelectOption[] = PROPERTY_TYPES;
  protected readonly priceOptions: SelectOption[] = PRICE_RANGE_OPTIONS;
}
