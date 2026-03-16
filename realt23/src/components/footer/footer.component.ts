import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Copyright -->
          <a href="https://github.com/daytec-org" target="_blank" class="text-gray-600 dark:text-gray-300">
            © 2026 Daytec
          </a>

          <!-- Links -->
          <div class="flex space-x-6">
            <a routerLink="/privacy" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a routerLink="/offer" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Публичная офёрта
            </a>
            <a href="https://t.me/some_link" target="_blank">
              <img class="link_icon" width="24" src="/icons/telegram.svg" alt="telegram"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
