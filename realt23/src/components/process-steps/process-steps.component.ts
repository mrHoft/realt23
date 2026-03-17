import { Component } from '@angular/core';

@Component({
  selector: 'app-process-steps',
  standalone: true,
  template: `
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Продайте недвижимость в 4 простых шага
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Присоединяйтесь к тысячам продавцов, сэкономивших тысячи на комиссиях
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div class="relative">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-2xl p-6 text-center h-full">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-gray-600 dark:text-gray-300">1</span>
              </div>
              <div class="mb-4 flex justify-center">
                <img src="icons/publish.svg" alt="Публикация" class="w-12 h-12 link_icon">
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Бесплатная публикация
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Разместите объявление за минуты — абсолютно бесплатно, без скрытых платежей
              </p>
            </div>
            <div class="hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300 dark:bg-gray-600" style="right: calc(var(--spacing) * -8);"></div>
          </div>

          <div class="relative">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center h-full">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-gray-600 dark:text-gray-300">2</span>
              </div>
              <div class="mb-4 flex justify-center">
                <img src="icons/offer.svg" alt="Предложения" class="w-12 h-12 link_icon">
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Получите предложения агентов
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Получайте конкурентные предложения от проверенных местных агентов
              </p>
            </div>
            <div class="hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300 dark:bg-gray-600" style="right: calc(var(--spacing) * -8);"></div>
          </div>

          <div class="relative">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center h-full">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-gray-600 dark:text-gray-300">3</span>
              </div>
              <div class="mb-4 flex justify-center">
                <img src="icons/compare.svg" alt="Сравнение" class="w-12 h-12 link_icon">
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Сравните и выберите
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Изучите предложения, ставки комиссии и опыт агентов
              </p>
            </div>
            <div class="hidden lg:block absolute top-1/2 transform -translate-y-1/2 w-8 h-0.5 bg-gray-300 dark:bg-gray-600" style="right: calc(var(--spacing) * -8);"></div>
          </div>

          <div>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center h-full">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-gray-600 dark:text-gray-300">4</span>
              </div>
              <div class="mb-4 flex justify-center">
                <img src="icons/deal.svg" alt="Сделка" class="w-12 h-12 link_icon">
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Заключите сделку
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Работайте с выбранным агентом и продавайте с уверенностью
              </p>
            </div>
          </div>
        </div>

        <div class="bg-primary-500 rounded-2xl p-8 text-center">
          <div class="flex flex-wrap justify-center gap-8">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span class="text-primary-500 text-sm">✓</span>
              </div>
              <span class="text-white font-medium">Без регистрации</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span class="text-primary-500 text-sm">✓</span>
              </div>
              <span class="text-white font-medium">Нулевая комиссия</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span class="text-primary-500 text-sm">✓</span>
              </div>
              <span class="text-white font-medium">Мгновенный контакт с агентом</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProcessStepsComponent { }
