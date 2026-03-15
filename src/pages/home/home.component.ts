import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Property } from '../../interfaces/property.interface';
import { PropertyListComponent } from '../../components/property-list/property-list.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { CtaFormComponent } from '../../components/cta-form/cta-form.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroComponent,
    PropertyListComponent,
    AchievementsComponent,
    CtaFormComponent
  ],
  template: `
    <app-hero />

    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <app-property-list
          [properties]="featuredProperties()"
          [loading]="false"
        />

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

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  private loadFeaturedProperties(): void {
    this.apiService.getProperties().then(properties => {
      this.featuredProperties.set(properties.slice(0, 3));
    });
  }
}
