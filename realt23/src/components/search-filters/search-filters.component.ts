import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyFilters } from '../../interfaces/property.interface';
import { PROPERTY_TYPES, PRICE_OPTIONS } from '../../constants/property.constants';

@Component({
  selector: 'app-search-filters',
  imports: [FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Расположение
          </label>
          <input
            type="text"
            [(ngModel)]="filters.location"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
        </div>

        <!-- Property type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Тип недвижимости
          </label>
          <select
            [(ngModel)]="filters.type"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            @for (option of propertyTypes; track option.value) {
              <option [value]="option.value">{{ option.label }}</option>
            }
          </select>
        </div>

        <!-- Min price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Мин. цена
          </label>
          <select
            [(ngModel)]="filters.minPrice"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            @for (option of priceOptions; track option.value) {
              <option [value]="option.value">{{ option.label }}</option>
            }
          </select>
        </div>

        <!-- Max price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Макс. цена
          </label>
          <select
            [(ngModel)]="filters.maxPrice"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            @for (option of priceOptions; track option.value) {
              <option [value]="option.value">{{ option.label }}</option>
            }
          </select>
        </div>
      </div>

      <!-- Search button -->
      <div class="mt-4 flex justify-end">
        <button
          (click)="onSearch()"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Поиск
        </button>
      </div>
    </div>
  `
})
export class SearchFiltersComponent {
  protected readonly search = output<PropertyFilters>();

  protected filters: PropertyFilters = {
    location: '',
    type: '',
    minPrice: 0,
    maxPrice: 0
  };

  protected readonly propertyTypes = PROPERTY_TYPES;
  protected readonly priceOptions = PRICE_OPTIONS;

  protected onSearch(): void {
    this.search.emit(this.filters);
  }
}
