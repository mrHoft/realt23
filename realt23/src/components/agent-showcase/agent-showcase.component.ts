import { Component, inject, OnInit, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '../../services/agent.service';
import type { Agent, AgentFilters } from '../../interfaces/agent.interface';
import { ButtonLinkComponent } from '../button-link/button-link.component';
import { AgentCardComponent } from './agent-card.component';

@Component({
  selector: 'app-agent-showcase',
  standalone: true,
  imports: [CommonModule, ButtonLinkComponent, AgentCardComponent],
  template: `
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Лучшие агенты по рейтингу
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300">
              Работайте с лучшими профессионалами в сфере недвижимости в вашем районе
            </p>
          </div>
          <app-button-link routerLink="/rating" label="Все агенты"/>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
          <button
            (click)="toggleFilter('verified')"
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            [class.bg-primary-100]="filters().verified"
            [class.text-primary-700]="filters().verified"
            [class.dark:bg-primary-900]="filters().verified"
            [class.dark:text-primary-300]="filters().verified"
            [class.bg-gray-100]="!filters().verified"
            [class.text-gray-700]="!filters().verified"
            [class.dark:bg-gray-700]="!filters().verified"
            [class.dark:text-gray-300]="!filters().verified"
          >
            <span class="mr-1">🏆</span> Проверенные
          </button>

          <button
            (click)="toggleFilter('fastResponse')"
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            [class.bg-primary-100]="filters().fastResponse"
            [class.text-primary-700]="filters().fastResponse"
            [class.dark:bg-primary-900]="filters().fastResponse"
            [class.dark:text-primary-300]="filters().fastResponse"
            [class.bg-gray-100]="!filters().fastResponse"
            [class.text-gray-700]="!filters().fastResponse"
            [class.dark:bg-gray-700]="!filters().fastResponse"
            [class.dark:text-gray-300]="!filters().fastResponse"
          >
            <span class="mr-1">⚡</span> Быстрый ответ
          </button>

          <button
            (click)="toggleFilter('expert')"
            class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            [class.bg-primary-100]="filters().expert"
            [class.text-primary-700]="filters().expert"
            [class.dark:bg-primary-900]="filters().expert"
            [class.dark:text-primary-300]="filters().expert"
            [class.bg-gray-100]="!filters().expert"
            [class.text-gray-700]="!filters().expert"
            [class.dark:bg-gray-700]="!filters().expert"
            [class.dark:text-gray-300]="!filters().expert"
          >
            <span class="mr-1">📍</span> Местный эксперт
          </button>
        </div>

        <div class="relative">
          <button
            (click)="scrollLeft()"
            class="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="!canScrollLeft()"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            (click)="scrollRight()"
            class="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            [disabled]="!canScrollRight()"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            #carouselContainer
            class="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            (mousedown)="onDragStart($event)"
            (mousemove)="onDragMove($event)"
            (mouseup)="onDragEnd()"
            (mouseleave)="onDragEnd()"
            (touchstart)="onTouchStart($event)"
            (touchmove)="onTouchMove($event)"
            (touchend)="onDragEnd()"
            (touchcancel)="onDragEnd()"
          >
            <div
              #carouselTrack
              class="flex gap-6 transition-transform duration-300 ease-in-out"
              [style.transform]="'translateX(-' + scrollPosition() + 'px)'"
              [style.transition-duration]="isDragging() ? '0ms' : '300ms'"
            >
              @for (agent of filteredAgents(); track agent.id) {
                <app-agent-card [agent]="agent" />
              }
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-1 mt-6 md:hidden">
          @for (page of totalPages(); track $index) {
            <button
              (click)="goToPage($index)"
              class="w-2 h-2 rounded-full transition-colors"
              [class.bg-primary-500]="currentPage() === $index"
              [class.bg-gray-300]="currentPage() !== $index"
            ></button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .cursor-grab {
      cursor: grab;
    }

    .cursor-grabbing {
      cursor: grabbing;
    }

    .select-none {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
  `]
})
export class AgentShowcaseComponent implements OnInit, AfterViewInit, OnDestroy {
  private agentService = inject(AgentService);
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  protected agents = signal<Agent[]>([]);
  protected filters = signal<AgentFilters>({
    rating: 0,
    verified: false,
    fastResponse: false,
    expert: false
  });

  protected scrollPosition = signal(0);
  protected isDragging = signal(false);
  protected dragStartX = 0;
  protected dragStartScroll = 0;
  protected itemWidth = 300; // 280px card + 20px gap
  protected visibleItems = 4;
  protected maxScroll = computed(() => {
    const totalItems = this.filteredAgents().length;
    const containerWidth = this.carouselContainer?.nativeElement?.offsetWidth || 0;
    const trackWidth = totalItems * this.itemWidth;

    return Math.max(0, trackWidth - containerWidth);
  });

  protected filteredAgents = computed(() => {
    const currentAgents = this.agents();
    const currentFilters = this.filters();

    return currentAgents.filter(agent => {
      if (currentFilters.verified && !agent.verified) return false;
      if (currentFilters.fastResponse && agent.responseTime >= 300) return false;
      if (currentFilters.expert && !agent.expert) return false;
      if (currentFilters.rating > 0 && agent.rating < currentFilters.rating) return false;
      return true;
    });
  });

  protected canScrollLeft = computed(() => this.scrollPosition() > 0);
  protected canScrollRight = computed(() => this.scrollPosition() < this.maxScroll());

  protected currentPage = computed(() => {
    return Math.round(this.scrollPosition() / this.itemWidth);
  });

  protected totalPages = computed(() => {
    return Array.from({ length: Math.ceil(this.filteredAgents().length / this.visibleItems) });
  });

  public async ngOnInit(): Promise<void> {
    await this.loadAgents();
    this.updateVisibleItems();
    window.addEventListener('resize', this.updateVisibleItems);
  }

  public ngAfterViewInit(): void {
    this.carouselTrack.nativeElement.addEventListener('dragstart', (e: Event) => e.preventDefault());
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateVisibleItems);
  }

  private async loadAgents(): Promise<void> {
    try {
      const agents = await this.agentService.getAgents();
      this.agents.set(agents);
    } catch (error) {
      console.error('Failed to load agents', error);
    }
  }

  public toggleFilter(filter: keyof Omit<AgentFilters, 'rating'>): void {
    this.filters.update(current => ({
      ...current,
      [filter]: !current[filter]
    }));
    this.scrollPosition.set(0);
  }

  protected scrollLeft(): void {
    this.scrollPosition.update(pos =>
      Math.max(0, pos - this.itemWidth)
    );
  }

  protected scrollRight(): void {
    this.scrollPosition.update(pos =>
      Math.min(this.maxScroll(), pos + this.itemWidth)
    );
  }

  protected goToPage(page: number): void {
    this.scrollPosition.set(page * this.itemWidth * this.visibleItems);
  }

  protected onDragStart(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isDragging.set(true);

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.dragStartX = clientX;
    this.dragStartScroll = this.scrollPosition();
  }

  protected onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging()) return;

    event.preventDefault();

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = (this.dragStartX - clientX) * 1.5;

    let newPosition = this.dragStartScroll + deltaX;
    newPosition = Math.max(0, Math.min(newPosition, this.maxScroll()));

    this.scrollPosition.set(newPosition);
  }

  protected onDragEnd(): void {
    if (this.isDragging()) {
      this.isDragging.set(false);
      this.snapToNearestItem();
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    this.onDragStart(event);
  }

  protected onTouchMove(event: TouchEvent): void {
    this.onDragMove(event);
  }

  private snapToNearestItem(): void {
    const currentPosition = this.scrollPosition();
    const nearestItem = Math.round(currentPosition / this.itemWidth);
    const targetPosition = Math.max(0, Math.min(nearestItem * this.itemWidth, this.maxScroll()));
    this.scrollPosition.set(targetPosition);
  }

  private updateVisibleItems = (): void => {
    if (window.innerWidth < 768) {
      this.visibleItems = 1;
    } else if (window.innerWidth < 1024) {
      this.visibleItems = 2;
    } else {
      this.visibleItems = 4;
    }

    const currentPos = this.scrollPosition();
    if (currentPos > this.maxScroll()) {
      this.scrollPosition.set(this.maxScroll());
    }
  }
}
