import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Property, PropertyFilters } from '../../interfaces/property.interface';
import { PropertyListComponent } from '../../components/property-list/property-list.component';
import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    PropertyListComponent,
    SearchFiltersComponent
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

      <!-- Property List Component -->
      <app-property-list [properties]="properties()" [loading]="loading()" />
    </div>
  `
})
export class CatalogComponent implements OnInit {
  private apiService = inject(ApiService);
  properties = signal<Property[]>([]);
  loading = signal(true);

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
