import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAIN_MENU } from '../../constants/menu.constants';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
  <nav class="hidden md:flex items-center space-x-8">
    @for (category of mainMenu; track category.id) {
      <div class="relative group">
        <button
          class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 py-2"
          [attr.aria-expanded]="false"
          [attr.aria-haspopup]="true"
        >
          {{ category.label }}
        </button>

        <!-- Dropdown menu -->
        <div class="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-700">
          @for (item of category.fields; track item.id) {
            <a
              [routerLink]="item.route"
              class="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
            >
              {{ item.label }}
            </a>
          }
        </div>
      </div>
    }
  </nav>
  `
})
export class MainMenuComponent {
  readonly mainMenu = MAIN_MENU;
}
