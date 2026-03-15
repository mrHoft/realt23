import { Component, inject, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ConstructionBadgeComponent } from '../badge/construction-badge.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ConstructionBadgeComponent],
  template: `
    <section class="relative h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <!-- Badges -->
      <app-construction-badge/>

      <!-- Video Background -->
      <div class="absolute inset-0 w-full h-full">
        <video
          #heroVideo autoplay muted loop playsinline preload="auto"
          class="absolute min-w-full min-h-full object-cover"
          [class.opacity-50]="themeService.isDark()"
        >
          <source src="/images/promo.mp4" type="video/mp4">
        </video>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      <!-- Content (unchanged) -->
      <div class="relative container mx-auto px-4 text-center z-10">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Найдите дом своей мечты (demo)
        </h1>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
          (дальше на английском: так проще писать код)
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
      <div #scrollIndicator class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" [style.display]="showScrollIndicator ? 'block' : 'none'">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  public themeService = inject(ThemeService);
  public showScrollIndicator = true;

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef<HTMLElement>;

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollIndicator = scrollPosition <= 20;
  }

  public ngAfterViewInit(): void {
    this.ensureVideoPlays();
    this.onWindowScroll();
  }

  private ensureVideoPlays(): void {
    const video = this.heroVideo.nativeElement;
    video.play().catch(() => {
      const playOnInteraction = () => {
        video.play().catch(e => console.error('Failed to play video:', e));

        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('click', playOnInteraction);
      };

      document.addEventListener('touchstart', playOnInteraction, { once: true });
      document.addEventListener('click', playOnInteraction, { once: true });
    });
  }
}
