import { Component, inject, OnInit, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { AchievementsService, Achievement } from '../../services/achievements.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  template: `
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        @if (loading()) {
          <div class="flex justify-center items-center py-8">
            <div class="animate-pulse flex space-x-4">
              @for (item of [1,2,3,4,5]; track item) {
                <div class="text-center">
                  <div class="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div class="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
            @for (achievement of achievements(); track achievement.label; let i = $index) {
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {{ getFormattedValue(i) }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ achievement.label }}
                </div>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `
})
export class AchievementsComponent implements OnInit, AfterViewInit, OnDestroy {
  private achievementsService = inject(AchievementsService);
  private observer: IntersectionObserver;
  private animationFrame: number | null = null;

  achievements = signal<Achievement[]>([]);
  currentValues = signal<number[]>([]);
  loading = signal(true);

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.loading()) {
            this.playAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    const element = document.querySelector('section');
    if (element) {
      this.observer.observe(element);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  getFormattedValue(index: number): string | number {
    const values = this.currentValues();
    if (!values || index >= values.length) {
      return 0;
    }

    const achievement = this.achievements()[index];
    const currentValue = values[index];

    if (typeof achievement.value === 'string') {
      return achievement.value.replace(/\d+/, currentValue.toString());
    }

    return currentValue;
  }

  private loadData(): void {
    this.loading.set(true);
    this.achievementsService.getAchievements().then(data => {
      this.achievements.set(data);
      this.resetValues();
      this.loading.set(false);
      this.checkVisibilityAndPlay();
    });
  }

  private resetValues(): void {
    this.currentValues.set(new Array(this.achievements().length).fill(0));
  }

  private checkVisibilityAndPlay(): void {
    const element = document.querySelector('section');
    if (element && this.isElementVisible(element)) {
      this.playAnimation();
    }
  }

  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.7 && rect.bottom >= 0;
  }

  private playAnimation(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    this.resetValues();
    this.animate();
  }

  private animate(): void {
    const achievements = this.achievements();
    const duration = 3000;
    const startTime = performance.now();
    const targetValues = achievements.map(a => this.extractNumericValue(a.value));

    const updateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const newValues = targetValues.map(target =>
        Math.round(target * easedProgress)
      );

      this.currentValues.set(newValues);

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(updateFrame);
      } else {
        this.animationFrame = null;
      }
    };

    this.animationFrame = requestAnimationFrame(updateFrame);
  }

  private extractNumericValue(value: string | number): number {
    if (typeof value === 'number') {
      return value;
    }
    const match = value.toString().match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }
}
