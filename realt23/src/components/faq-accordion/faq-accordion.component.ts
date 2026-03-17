import { Component, signal } from '@angular/core';
import { ButtonLinkComponent } from '../button-link/button-link.component';

@Component({
  selector: 'app-faq-accordion',
  imports: [ButtonLinkComponent],
  standalone: true,
  template: `
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Всё, что нужно знать о продаже с нами
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <div class="mb-4">
            <button
              (click)="toggleQuestion(0)"
              class="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-lg font-semibold text-gray-900 dark:text-white text-left">
                Как выбрать подходящего агента?
              </span>
              <img
                src="icons/chevron_down.svg"
                alt="Переключить"
                class="link_icon w-5 h-5 transition-transform duration-300"
                [class.rotate-180]="openStates()[0]"
              >
            </button>

            @if (openStates()[0]) {
              <div class="mt-2 p-6 bg-white dark:bg-gray-900 rounded-2xl">
                <p class="text-gray-600 dark:text-gray-400">
                  Вы можете выбрать одного из представленных агентов или разрешить автоматическое назначение. Каждый профиль агента включает его рейтинг, опыт и отзывы клиентов, чтобы помочь вам принять взвешенное решение.
                </p>
              </div>
            }
          </div>

          <div class="mb-4">
            <button
              (click)="toggleQuestion(1)"
              class="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-lg font-semibold text-gray-900 dark:text-white text-left">
                Публикация действительно бесплатна?
              </span>
              <img
                src="icons/chevron_down.svg"
                alt="Переключить"
                class="link_icon w-5 h-5 transition-transform duration-300"
                [class.rotate-180]="openStates()[1]"
              >
            </button>

            @if (openStates()[1]) {
              <div class="mt-2 p-6 bg-white dark:bg-gray-900 rounded-2xl">
                <p class="text-gray-600 dark:text-gray-400">
                  Да. Абсолютно. Размещение объявления о вашей недвижимости совершенно бесплатно, без скрытых затрат, без необходимости вводить данные кредитной карты и без ограничений по времени. Вы платите только в том случае, если решите работать с агентом (и даже тогда комиссия обсуждается напрямую с агентом).
                </p>
              </div>
            }
          </div>

          <div class="mb-4">
            <button
              (click)="toggleQuestion(2)"
              class="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-lg font-semibold text-gray-900 dark:text-white text-left">
                Что если я захочу сменить агента?
              </span>
              <img
                src="icons/chevron_down.svg"
                alt="Переключить"
                class="link_icon w-5 h-5 transition-transform duration-300"
                [class.rotate-180]="openStates()[2]"
              >
            </button>

            @if (openStates()[2]) {
              <div class="mt-2 p-6 bg-white dark:bg-gray-900 rounded-2xl">
                <p class="text-gray-600 dark:text-gray-400">
                  Вы можете сделать это в любое время до подписания соглашения. Нет обязательного периода, и вы можете свободно сменить агента или сделать перерыв, когда вам нужно. Ваши объявления и данные остаются вашими.
                </p>
              </div>
            }
          </div>

          <div class="mb-4">
            <button
              (click)="toggleQuestion(3)"
              class="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-lg font-semibold text-gray-900 dark:text-white text-left">
                Как защищены мои личные данные?
              </span>
              <img
                src="icons/chevron_down.svg"
                alt="Переключить"
                class="link_icon w-5 h-5 transition-transform duration-300"
                [class.rotate-180]="openStates()[3]"
              >
            </button>

            @if (openStates()[3]) {
              <div class="mt-2 p-6 bg-white dark:bg-gray-900 rounded-2xl">
                <p class="text-gray-600 dark:text-gray-400">
                  Никто не может видеть ваши личные данные, кроме вашего агента, после того как вы решите поделиться ими. Ваша контактная информация, адрес и другие данные остаются конфиденциальными, пока вы явно не решите раскрыть их конкретному агенту.
                </p>
              </div>
            }
          </div>

          <div class="mb-4">
            <button
              (click)="toggleQuestion(4)"
              class="w-full flex items-center justify-between p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span class="text-lg font-semibold text-gray-900 dark:text-white text-left">
                Берёте ли вы комиссию с продажи?
              </span>
              <img
                src="icons/chevron_down.svg"
                alt="Переключить"
                class="link_icon w-5 h-5 transition-transform duration-300"
                [class.rotate-180]="openStates()[4]"
              >
            </button>

            @if (openStates()[4]) {
              <div class="mt-2 p-6 bg-white dark:bg-gray-900 rounded-2xl">
                <p class="text-gray-600 dark:text-gray-400">
                  Нет. Это полностью бесплатно. Мы не берём никакой комиссии с вашей продажи. Любые комиссионные агента обсуждаются напрямую между вами и выбранным агентом, а наша платформа остаётся бесплатной для продавцов навсегда.
                </p>
              </div>
            }
          </div>
        </div>

        <div class="text-center mt-12">
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Остались вопросы? Мы готовы помочь.
          </p>
          <app-button-link routerLink="/help" label="Связаться с поддержкой"/>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .mt-2 {
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class FAQAccordionComponent {
  protected openStates = signal<boolean[]>([false, false, false, false, false]);

  public toggleQuestion(index: number): void {
    this.openStates.update(states =>
      states.map((state, i) => i === index ? !state : false)
    );
  }
}
