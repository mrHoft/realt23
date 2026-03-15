import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-construction-badge',
  standalone: true,
  template: `
    <div class="absolute top-4 left-4 z-10 p-4 rounded-lg shadow-lg max-w-xs border
                bg-yellow-50 border-yellow-300
                dark:bg-yellow-900/90 dark:border-yellow-700">
      <p class="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
        Service is under construction
      </p>
      <div class="font-mono text-2xl font-bold text-center text-yellow-900 dark:text-yellow-100">
        {{ timeRemaining() }}
      </div>
    </div>
  `
})
export class ConstructionBadgeComponent {
  private targetDate = new Date('Mar 14 2026 20:00:00');
  private currentDate = signal(new Date());

  constructor() {
    setInterval(() => {
      this.currentDate.set(new Date());
    }, 1000);
  }

  public timeRemaining = computed((): string => {
    const diff = this.currentDate().getTime() - this.targetDate.getTime();

    if (diff <= 0) {
      return '00d 00h';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h`;
  });
}
