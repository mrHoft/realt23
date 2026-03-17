import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-100 dark:bg-gray-800 py-8 mt-12">
      <div class="container mx-auto px-4">
        <!-- Main Footer Content -->
        <div class="flex flex-col space-y-8">
          <!-- Links Grid - Grouped and Mobile Ready -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Group 1: Main Navigation -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Навигация
              </h3>
              <div class="flex flex-col space-y-2">
                <a routerLink="/how_it_works" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Как это работает
                </a>
                <a routerLink="/agent" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Портал для агентов
                </a>
                <a routerLink="/help" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Центр поддержки
                </a>
              </div>
            </div>

            <!-- Group 2: Legal Information -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Юридическая информация
              </h3>
              <div class="flex flex-col space-y-2">
                <a routerLink="/privacy" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Политика конфиденциальности
                </a>
                <a routerLink="/offer" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Публичная офёрта
                </a>
              </div>
            </div>

            <!-- Group 3: About Daytec -->
            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                О нас
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Платформа для безопасной и выгодной продажи недвижимости без посредников и скрытых комиссий.
              </p>
            </div>
          </div>

          <!-- Bottom Bar with Copyright and Social Links -->
          <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
              <!-- Copyright -->
              <a href="https://github.com/daytec-org" target="_blank" class="text-gray-600 dark:text-gray-300 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors order-2 sm:order-1">
                © 2026 Daytec.
              </a>

              <!-- Bottom Links and Social -->
              <div class="flex flex-wrap items-center justify-center gap-4 order-1 sm:order-2">
                <!-- Social Icons (if needed separately) -->
                <div class="flex space-x-3">
                  <a href="https://t.me/some_link" target="_blank" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <img class="link_icon" width="20" src="/icons/telegram.svg" alt="telegram"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }
