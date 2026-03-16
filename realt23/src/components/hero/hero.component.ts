import { Component, inject, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ConstructionBadgeComponent } from '../badge/construction-badge.component';
import { SearchFormComponent } from '../search-form/search-form.component';

@Component({
  selector: 'app-hero',
  imports: [ConstructionBadgeComponent, SearchFormComponent],
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

      <!-- Content -->
      <div class="relative container mx-auto px-4 text-center z-10">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Найдите дом своей мечты
        </h1>
        <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
          (demo)
        </p>

        <!-- Search Form Component -->
        <app-search-form/>
      </div>

      <!-- Scroll indicator -->
      <div
        #scrollIndicator
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        [style.display]="showScrollIndicator ? 'block' : 'none'"
      >
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  protected readonly themeService = inject(ThemeService);
  protected showScrollIndicator = true;

  @ViewChild('heroVideo') private heroVideo!: ElementRef<HTMLVideoElement>;

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
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
      const playOnInteraction = (): void => {
        video.play().catch((e: Error) => console.error('Failed to play video:', e));
        document.removeEventListener('touchstart', playOnInteraction);
        document.removeEventListener('click', playOnInteraction);
      };

      document.addEventListener('touchstart', playOnInteraction, { once: true });
      document.addEventListener('click', playOnInteraction, { once: true });
    });
  }
}
