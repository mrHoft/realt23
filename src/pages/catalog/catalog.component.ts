import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Property, PropertyFilters } from '../../interfaces/property.interface';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';
import { GridListToggleComponent } from '../../components/grid-list-toggle/grid-list-toggle.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    PropertyCardComponent,
    SearchFiltersComponent,
    GridListToggleComponent
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Property Catalog
      </h1>

      <!-- Filters -->
      <div class="mb-8">
        <app-search-filters (search)="onSearch($event)" />
      </div>

      <!-- View toggle and results count -->
      <div class="flex justify-between items-center mb-6">
        <p class="text-gray-600 dark:text-gray-300">
          Found {{ properties().length }} properties
        </p>
        <app-grid-list-toggle
          [currentView]="viewMode()"
          (viewMode)="viewMode.set($event)"
        />
      </div>

      <!-- Loading state -->
      @if (loading()) {
        <div class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }

      <!-- Properties grid/list -->
      @if (!loading()) {
        <div
          class="grid gap-6"
          [class.grid-cols-1]="viewMode() === 'list'"
          [class.md:grid-cols-2]="viewMode() === 'grid'"
          [class.lg:grid-cols-3]="viewMode() === 'grid'"
        >
          @for (property of properties(); track property.id) {
            <app-property-card [property]="property" />
          }
        </div>
      }

      <!-- No results -->
      @if (!loading() && properties().length === 0) {
        <div class="text-center py-12">
          <p class="text-gray-600 dark:text-gray-300 text-lg">
            No properties found matching your criteria.
          </p>
        </div>
      }
    </div>
  `
})
export class CatalogComponent implements OnInit {
  private apiService = inject(ApiService);
  properties = signal<Property[]>([]);
  loading = signal(true);
  viewMode = signal<'grid' | 'list'>('grid');

  ngOnInit(): void {
    this.loadProperties();
  }

  private loadProperties(filters?: PropertyFilters): void {
    this.loading.set(true);
    this.apiService.getProperties(filters).then(properties => {
      this.properties.set(properties);
      this.loading.set(false);
    });
  }

  onSearch(filters: PropertyFilters): void {
    this.loadProperties(filters);
  }
}
