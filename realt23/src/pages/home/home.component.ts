import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Property } from '../../interfaces/property.interface';
import { PropertyListComponent } from '../../components/property-list/property-list.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { CtaFormComponent } from '../../components/cta-form/cta-form.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProcessStepsComponent } from '../../components/process-steps/process-steps.component';
import { AgentShowcaseComponent } from '../../components/agent-showcase/agent-showcase.component';
import { TrustSafetyComponent } from '../../components/trust-safety/trust-safety.component';
import { FAQAccordionComponent } from '../../components/faq-accordion/faq-accordion.component';
import { AgentTeaserComponent } from '../../components/agent-teaser/agent-teaser.component';
import { AgencyListComponent } from '../../components/agency-list/agency-list.component';
import { ButtonLinkComponent } from '../../components/button-link/button-link.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    HeroComponent,
    ButtonLinkComponent,
    ProcessStepsComponent,
    TrustSafetyComponent,
    AgentShowcaseComponent,
    PropertyListComponent,
    AchievementsComponent,
    FAQAccordionComponent,
    AgentTeaserComponent,
    CtaFormComponent,
    AgencyListComponent
  ],
  template: `
    <app-hero />

    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <app-property-list [properties]="featuredProperties()" [loading]="false" />

        <div class="text-center mt-8">
          <app-button-link routerLink="/catalog" label="Смотреть всё"/>
        </div>
      </div>
    </section>

    <app-agent-showcase/>
    <app-agent-teaser/>
    <app-agency-list/>
    <app-process-steps/>
    <app-achievements />
    <app-trust-safety/>
    <app-faq-accordion/>
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
