import { Component, inject, OnInit, AfterViewInit, OnDestroy, ElementRef, viewChild, signal } from '@angular/core';
import { AchievementsService, Achievement } from '../../services/achievements.service';

@Component({
  selector: 'app-achievements',
  standalone: true,
  template: `
    <section #sectionRef class="py-16 bg-gray-50 dark:bg-gray-800">
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
                  {{ currentValues()[i] }}+
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

  readonly sectionRef = viewChild<ElementRef<HTMLElement>>('sectionRef');

  achievements = signal<Achievement[]>([]);
  currentValues = signal<number[]>([]);
  loading = signal(true);
  private targetValues: number[] = [];

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Only play if we have achievements loaded and animation is not already running
            if (this.achievements().length > 0 && !this.animationFrame) {
              this.playAnimation();
            }
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
    const element = this.sectionRef()?.nativeElement;
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

  private loadData(): void {
    this.loading.set(true);
    this.achievementsService.getAchievements().then(data => {
      this.achievements.set(data);
      this.targetValues = data.map(a => this.extractNumericValue(a.value));
      this.resetValues();
      this.loading.set(false);

      // Check if already visible after loading
      const element = this.sectionRef()?.nativeElement;
      if (element && this.isElementVisible(element)) {
        this.playAnimation();
      }
    });
  }

  private resetValues(): void {
    this.currentValues.set(new Array(this.achievements().length).fill(0));
  }

  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.7 && rect.bottom >= 0;
  }

  private playAnimation(): void {
    // Cancel any existing animation
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    // Reset values to 0 before starting new animation
    this.resetValues();

    // Start new animation
    this.animate();
  }

  private animate(): void {
    const duration = 3000;
    const startTime = performance.now();

    const updateFrame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const newValues = this.targetValues.map(target =>
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
