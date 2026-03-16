import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
  <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-200">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center space-x-2">
          <img src="/icons/logo.svg" alt="logo" class="w-8 h-8"/>
          <span class="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-200">realt23</span>
        </a>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Theme switcher -->
          <button
            (click)="themeService.toggleTheme()"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            @if (themeService.isDark()) {
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/>
              </svg>
            } @else {
              <svg class="w-5 h-5" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5">
              <circle fill="currentColor" cx="12" cy="12" r="5"/>
              <g stroke="currentColor">
              <line x1="12" y1="2" x2="12" y2="6"/>
              <line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="18" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="12" x2="6" y2="12"/>
              <line x1="5" y1="5" x2="7.8" y2="7.8"/>
              <line x1="16.2" y1="16.2" x2="19" y2="19"/>
              <line x1="16.2" y1="7.8" x2="19" y2="5"/>
              <line x1="5" y1="19" x2="7.8" y2="16.2"/>
              </g>
              </svg>
            }
          </button>

          <!-- Auth/Profile icon -->
          <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
  `
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}
