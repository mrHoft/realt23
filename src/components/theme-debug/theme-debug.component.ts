import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-debug',
  standalone: true,
  template: `
    <div class="fixed bottom-4 right-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
      <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Theme Debug</p>
      <p class="text-xs font-mono">
        HTML class: <span class="font-bold">{{ htmlClass }}</span><br>
        isDark signal: <span class="font-bold">{{ themeService.isDark() }}</span><br>
        Local storage: <span class="font-bold">{{ localStorageTheme }}</span>
      </p>
      <button
        (click)="refresh()"
        class="mt-2 px-2 py-1 text-xs bg-blue-500 text-white rounded"
      >
        Refresh
      </button>
    </div>
  `
})
export class ThemeDebugComponent {
  themeService = inject(ThemeService);

  get htmlClass(): string {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  get localStorageTheme(): string {
    return localStorage.getItem('theme') || 'not set';
  }

  refresh() {
    // Force change detection
    this.themeService.isDark.set(this.themeService.isDark());
  }
}
