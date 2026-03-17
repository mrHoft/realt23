import { Component, OnInit, OnDestroy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AgencyLogo {
  id: string;
  src: string;
  alt: string;
  className?: string;
}

@Component({
  selector: 'app-agency-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Наши клиенты
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            С 2026 года автоматизируем и упрощаем работу
          </p>
        </div>

        <!-- First Row - Primary Agencies -->
        <div class="relative mb-8 overflow-hidden">
          <div
            class="flex gap-6 animate-slide-left"
            [style.width]="firstRowWidth()"
          >
            <!-- Primary logos -->
            @for (logo of primaryLogos(); track logo.id) {
              <div class="flex-none w-[120px] md:w-[140px]">
                <div class="p-4 h-20 flex items-center justify-center">
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    [class]="logo.className"
                    class="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  >
                </div>
              </div>
            }
            <!-- Duplicate for seamless loop -->
            @for (logo of primaryLogos(); track logo.id + '-duplicate') {
              <div class="flex-none w-[120px] md:w-[140px]">
                <div class="p-4 h-20 flex items-center justify-center">
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    [class]="logo.className"
                    class="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  >
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Second Row - Real Estate Agencies -->
        <div class="relative mb-8 overflow-hidden">
          <div
            class="flex gap-6 animate-slide-right"
            [style.width]="secondRowWidth()"
          >
            <!-- Real estate logos -->
            @for (logo of realEstateLogos(); track logo.id) {
              <div class="flex-none w-[140px] md:w-[160px]">
                <div class="p-4 h-20 flex items-center justify-center">
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    [class]="logo.className"
                    class="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  >
                </div>
              </div>
            }
            <!-- Duplicate for seamless loop -->
            @for (logo of realEstateLogos(); track logo.id + '-duplicate') {
              <div class="flex-none w-[140px] md:w-[160px]">
                <div class="p-4 h-20 flex items-center justify-center">
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    [class]="logo.className"
                    class="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  >
                </div>
              </div>
            }
          </div>
        </div>

        <!-- Third Row - Development Companies -->
        <div class="relative mb-8 overflow-hidden">
          <div
            class="flex gap-6 animate-slide-left"
            [style.width]="thirdRowWidth()"
          >
            <!-- Development logos -->
            @for (logo of developmentLogos(); track logo.id) {
              <div class="flex-none w-[120px] md:w-[140px]">
                <div class="p-4 h-20 flex items-center justify-center">
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    [class]="logo.className"
                    class="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  >
                </div>
              </div>
            }
            <!-- Duplicate for seamless loop -->
            @for (logo of developmentLogos(); track logo.id + '-duplicate') {
              <div class="flex-none w-[120px] md:w-[140px]">
                <div class="p-4 h-20 flex items-center justify-center">
                  <img
                    [src]="logo.src"
                    [alt]="logo.alt"
                    [class]="logo.className"
                    class="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  >
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Auto-sliding animations */
    @keyframes slideLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes slideRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }

    .animate-slide-left {
      animation: slideLeft 30s linear infinite;
    }

    .animate-slide-right {
      animation: slideRight 30s linear infinite;
    }

    /* Pause animation on hover */
    .animate-slide-left:hover,
    .animate-slide-right:hover {
      animation-play-state: paused;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .animate-slide-left,
      .animate-slide-right {
        animation-duration: 20s;
      }
    }
  `]
})
export class AgencyListComponent implements OnInit, OnDestroy {
  // Signal for logos data
  protected primaryLogos = signal<AgencyLogo[]>([
    { id: 'miel', src: 'partner/miel.png', alt: 'Миэль', className: '_miel' },
    { id: 'century', src: 'partner/century.png', alt: 'Century 21', className: '_century' },
    { id: 'useful-ppl', src: 'partner/useful-ppl.png', alt: 'Useful People', className: '_useful-ppl' },
    { id: 'ajaks', src: 'partner/ajaks.png', alt: 'Аякс', className: '_ajaks' },
    { id: 'mk', src: 'partner/mk.png', alt: 'МК', className: '_mk' },
    { id: 'altera', src: 'partner/altera.png', alt: 'Альтера', className: '_altera' },
    { id: 'makromir', src: 'partner/makromir.png', alt: 'Макромир', className: '_makromir' }
  ]);

  protected realEstateLogos = signal<AgencyLogo[]>([
    { id: 'region', src: 'partner/region.png', alt: 'Регион', className: '_region' },
    { id: 'kayan', src: 'partner/kayan.png', alt: 'Каян', className: '_kayan' },
    { id: 'mic', src: 'partner/mic.png', alt: 'МИЦ', className: '_mic' },
    { id: 'kredit-center', src: 'partner/kredit-center.png', alt: 'Кредит центр', className: '_kredit-center' },
    { id: 'don', src: 'partner/don.png', alt: 'Дон', className: '_don' },
    { id: 'dan', src: 'partner/dan.png', alt: 'Дан', className: '_dan' },
    { id: 'arin', src: 'partner/arin.png', alt: 'Арин', className: '_arin' }
  ]);

  protected developmentLogos = signal<AgencyLogo[]>([
    { id: 'samolet', src: 'partner/samolet.png', alt: 'Самолет', className: '_samolet' },
    { id: 'domian', src: 'partner/domian.png', alt: 'Домиан', className: '_domian' },
    { id: 'ppl-pro', src: 'partner/ppl-pro.png', alt: 'PPL Pro', className: '_ppl-pro' },
    { id: 'ekoton', src: 'partner/ekoton.png', alt: 'Экотон', className: '_ekoton' },
    { id: 'itaka', src: 'partner/itaka.png', alt: 'Итака', className: '_itaka' },
    { id: 'monolit', src: 'partner/monolit.png', alt: 'Монолит', className: '_monolit' },
    { id: 'titul', src: 'partner/titul.png', alt: 'Титул', className: '_titul' },
    { id: 'vilema', src: 'partner/vilema.png', alt: 'Вилема', className: '_vilema' }
  ]);

  // Computed widths for animation containers
  protected firstRowWidth = computed(() => {
    const count = this.primaryLogos().length;
    return `${(count * 2) * (140 + 24)}px`; // 140px width + 24px gap
  });

  protected secondRowWidth = computed(() => {
    const count = this.realEstateLogos().length;
    return `${(count * 2) * (160 + 24)}px`;
  });

  protected thirdRowWidth = computed(() => {
    const count = this.developmentLogos().length;
    return `${(count * 2) * (140 + 24)}px`;
  });

  private animationInterval?: number;

  public ngOnInit(): void {
    // Optional: Pause animations when tab is not visible
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  public ngOnDestroy(): void {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private handleVisibilityChange = (): void => {
    const elements = document.querySelectorAll('.animate-slide-left, .animate-slide-right');
    if (document.hidden) {
      elements.forEach(el => el.classList.add('animation-paused'));
    } else {
      elements.forEach(el => el.classList.remove('animation-paused'));
    }
  };
}
