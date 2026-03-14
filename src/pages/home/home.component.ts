import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Property, } from '../../interfaces/property.interface';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { CtaFormComponent } from '../../components/cta-form/cta-form.component';
import { GridListToggleComponent } from '../../components/grid-list-toggle/grid-list-toggle.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    PropertyCardComponent,
    AchievementsComponent,
    CtaFormComponent,
    GridListToggleComponent
  ],
  template: `
    <!-- Hero section with video background -->
    <section class="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <!-- Video Background -->
      <div class="absolute inset-0 w-full h-full">
        <video autoplay muted loop
          class="absolute min-w-full min-h-full object-cover"
          [class.opacity-50]="themeService.isDark()"
        >
          <source src="/promo.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      <!-- Content -->
      <div class="relative container mx-auto px-4 text-center z-10">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Discover your dream property
        </h1>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
          Find the perfect home from our extensive collection of luxury properties
        </p>

        <!-- Simplified search form -->
        <div class="max-w-4xl mx-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              #locationInput
              placeholder="Location"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
            <select
              #typeSelect
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Property type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
            <select
              #priceSelect
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Price range</option>
              <option value="0-500000">$0 - $500k</option>
              <option value="500000-1000000">$500k - $1M</option>
              <option value="1000000-2000000">$1M - $2M</option>
              <option value="2000000+">$2M+</option>
            </select>
            <button
              [routerLink]="['/catalog']"
              [queryParams]="{
                location: locationInput.value,
                type: typeSelect.value,
                price: priceSelect.value
              }"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>

    <!-- Example property listing -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
            Featured Properties
          </h2>
          <app-grid-list-toggle
            [currentView]="viewMode()"
            (viewMode)="viewMode.set($event)"
          />
        </div>

        <div
          class="grid gap-6"
          [class.grid-cols-1]="viewMode() === 'list'"
          [class.md:grid-cols-2]="viewMode() === 'grid'"
          [class.lg:grid-cols-3]="viewMode() === 'grid'"
        >
          @for (property of featuredProperties(); track property.id) {
            <app-property-card [property]="property" />
          }
        </div>

        <div class="text-center mt-8">
          <a
            routerLink="/catalog"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View all properties
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Achievements -->
    <app-achievements />

    <!-- CTA Form -->
    <app-cta-form />
  `
})
export class HomeComponent implements OnInit {
  themeService = inject(ThemeService);
  private apiService = inject(ApiService);
  featuredProperties = signal<Property[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  private loadFeaturedProperties(): void {
    this.apiService.getProperties().then(properties => {
      this.featuredProperties.set(properties.slice(0, 3));
    });
  }
}
