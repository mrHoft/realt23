import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Property } from '../../interfaces/property.interface';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { CtaFormComponent } from '../../components/cta-form/cta-form.component';
import { GridListToggleComponent } from '../../components/grid-list-toggle/grid-list-toggle.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroComponent,
    PropertyCardComponent,
    AchievementsComponent,
    CtaFormComponent,
    GridListToggleComponent
  ],
  template: `
    <app-hero />

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

    <app-achievements />
    <app-cta-form />
  `
})
export class HomeComponent implements OnInit {
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
