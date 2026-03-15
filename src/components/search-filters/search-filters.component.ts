import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PropertyFilters } from '../../interfaces/property.interface';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            [(ngModel)]="filters.location"
            placeholder="City or area"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
        </div>

        <!-- Property type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Property type
          </label>
          <select
            [(ngModel)]="filters.type"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">All types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </div>

        <!-- Min price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Min price
          </label>
          <select
            [(ngModel)]="filters.minPrice"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">No min</option>
            <option value="$100,000">$100k</option>
            <option value="$250,000">$250k</option>
            <option value="$500,000">$500k</option>
            <option value="$750,000">$750k</option>
            <option value="$1,000,000">$1M</option>
            <option value="$2,000,000">$2M</option>
            <option value="$5,000,000">$5M+</option>
          </select>
        </div>

        <!-- Max price -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max price
          </label>
          <select
            [(ngModel)]="filters.maxPrice"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">No max</option>
            <option value="$250,000">$250k</option>
            <option value="$500,000">$500k</option>
            <option value="$750,000">$750k</option>
            <option value="$1,000,000">$1M</option>
            <option value="$2,000,000">$2M</option>
            <option value="$5,000,000">$5M</option>
            <option value="$10,000,000">$10M+</option>
          </select>
        </div>
      </div>

      <!-- Search button -->
      <div class="mt-4 flex justify-end">
        <button
          (click)="search.emit(filters)"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search Properties
        </button>
      </div>
    </div>
  `
})
export class SearchFiltersComponent {
  filters: PropertyFilters = {
    location: '',
    type: '',
    minPrice: '',
    maxPrice: ''
  };

  @Output() search = new EventEmitter<PropertyFilters>();
}
