import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-safety',
  standalone: true,
  template: `
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ваша безопасность — наш приоритет
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Мы создали платформу, которой можно доверять, с вашими интересами в основе
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 relative group">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center relative">
                    <img src="icons/ai_moderation.svg" alt="AI модерация" class="w-6 h-6 link_icon">

                    <div class="absolute left-0 top-full mt-2 w-64 p-3 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div class="relative">
                        <div class="absolute -top-2 left-4 w-3 h-3 bg-gray-900 dark:bg-gray-700 transform rotate-45"></div>
                        <p class="relative">
                          Наш ИИ анализирует все коммуникации для обнаружения спама,
                          мошенничества и недопустимого поведения в реальном времени,
                          обеспечивая безопасный и профессиональный опыт.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      ИИ-модерация
                    </h3>
                    <span class="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-gray-900 dark:text-white text-xs font-medium rounded-full">
                      24/7 активна
                    </span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400">
                    Наш продвинутый ИИ отслеживает все взаимодействия, чтобы обеспечить безопасную и профессиональную среду для всех.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <img src="icons/privacy.svg" alt="Конфиденциальность" class="w-6 h-6 link_icon">
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ваши данные остаются конфиденциальными
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Пока вы не решите поделиться ими с агентом. Никакого автоматического раскрытия, никакого скрытого сбора данных.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <img src="icons/money_off.svg" alt="Без скрытых платежей" class="w-6 h-6 link_icon">
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Никаких скрытых платежей. Никогда.
                  </h3>
                  <p class="text-gray-600 dark:text-gray-400">
                    Что видите, то и получаете. Наша платформа полностью бесплатна для продавцов — никаких подписок, никаких сюрпризов.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 lg:p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <img src="icons/verified.svg" alt="Проверено" class="w-8 h-8 link_icon">
              Процесс верификации агентов
            </h3>

            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Проверка лицензии
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Мы проверяем лицензию на недвижимость каждого агента в государственных регулирующих органах
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Проверка биографии
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Комплексная проверка, включая профессиональный опыт и рекомендации
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Подтверждение опыта
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Мы подтверждаем прошлые сделки и отзывы клиентов, чтобы гарантировать успешный опыт работы
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    4
                  </div>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                    Постоянный мониторинг
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Регулярный анализ работы агентов и оценок удовлетворенности клиентов
                  </p>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center gap-3">
                  <div class="flex -space-x-2">
                    <div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <img src="icons/check_small.svg" alt="Проверено" class="w-4 h-4 link_icon">
                    </div>
                    <div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <img src="icons/check_small.svg" alt="Проверено" class="w-4 h-4 link_icon">
                    </div>
                    <div class="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <img src="icons/check_small.svg" alt="Проверено" class="w-4 h-4 link_icon">
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      <span class="font-bold">100%</span> агентов проверены
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      Обновляется ежедневно
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <img src="icons/ssl.svg" alt="SSL шифрование" class="w-6 h-6 link_icon">
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">SSL шифрование</div>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <img src="icons/security.svg" alt="Защита от мошенничества" class="w-6 h-6 link_icon">
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">Защита от мошенничества</div>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <img src="icons/star.svg" alt="Рейтинг доверия" class="w-6 h-6 link_icon">
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">Рейтинг доверия 4.9</div>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 mx-auto mb-2 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <img src="icons/gdpr.svg" alt="Соответствие GDPR" class="w-6 h-6 link_icon">
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">Соответствие GDPR</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .group:hover .group-hover\:opacity-100 {
      transition-delay: 150ms;
    }
  `]
})
export class TrustSafetyComponent { }
