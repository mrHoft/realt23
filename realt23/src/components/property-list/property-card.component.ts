import { Component, Input, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { ModalService } from '../../services/modal.service';
import { CustomCurrencyPipe } from '../../pipe/custom-currency.pipe';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CustomCurrencyPipe],
  template: `
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      (click)="openModal()"
    >
      <div class="relative h-48 overflow-hidden group select-none">
        <div
          #carouselContainer
          class="relative h-full flex transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing"
          [style.transform]="'translateX(' + getTransformValue() + ')'"
          [style.transition-duration]="isDragging() ? '0ms' : '300ms'"
          (mousedown)="onDragStart($event)"
          (mousemove)="onDragMove($event)"
          (mouseup)="onDragEnd($event)"
          (mouseleave)="onDragEnd($event)"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onDragEnd($event)"
          (touchcancel)="onDragEnd($event)"
        >
          @for (image of property.images; track image) {
            <img
              [src]="image"
              [alt]="property.title"
              class="w-full h-full object-cover flex-none transition-transform duration-300 group-hover:scale-110"
              draggable="false"
            >
          }
        </div>

        @if (property.images.length > 1) {
          <button
            (click)="prevImage($event)"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 z-10"
            [class.opacity-50]="!canGoPrev()"
            [class.cursor-not-allowed]="!canGoPrev()"
            [disabled]="!canGoPrev()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            (click)="nextImage($event)"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 z-10"
            [class.opacity-50]="!canGoNext()"
            [class.cursor-not-allowed]="!canGoNext()"
            [disabled]="!canGoNext()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
            @for (image of property.images; track image; let i = $index) {
              <button
                (click)="goToImage(i, $event)"
                class="w-1.5 h-1.5 rounded-full transition-all"
                [class.w-4]="currentImageIndex() === i"
                [class.bg-white]="currentImageIndex() === i"
                [class.bg-white/50]="currentImageIndex() !== i"
              ></button>
            }
          </div>
        }

        <div class="absolute top-2 left-2 z-10">
          <span class="px-2 py-1 text-xs font-semibold rounded-full"
            [class]="getStatusClass(property.status)">
            {{ property.status }}
          </span>
        </div>
      </div>

      <div class="p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <img [src]="property.agent.photo" [alt]="property.agent.name" class="w-6 h-6 rounded-full">
            <span class="text-sm text-gray-600 dark:text-gray-300">{{ property.agent.name }}</span>
          </div>
          <div class="flex items-center">
            @for (star of [1,2,3,4,5]; track star) {
              <svg class="w-4 h-4" [class.text-yellow-400]="star <= property.rating" [class.text-gray-300]="star > property.rating" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            }
          </div>
        </div>

        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1">{{ property.title }}</h3>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ property.price | customCurrency }} {{ property.currency }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ property.square }} кв.м</span>
        </div>

        <div class="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-sm">{{ property.location }}</span>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {{ property.description }}
        </p>

        <div class="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <button (click)="$event.stopPropagation()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <button (click)="$event.stopPropagation()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
          <button (click)="$event.stopPropagation()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cursor-grab { cursor: grab; }
    .cursor-grabbing { cursor: grabbing; }
    .select-none { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }
  `]
})
export class PropertyCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) property!: Property;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  currentImageIndex = signal(0);
  isDragging = signal(false);
  dragOffset = signal(0);
  private hasDragged = false;

  private dragStartX = 0;
  private dragStartIndex = 0;
  private containerWidth = 0;
  private modalService = inject(ModalService);

  canGoPrev = computed(() => {
    return this.currentImageIndex() > 0;
  });

  canGoNext = computed(() => {
    return this.currentImageIndex() < this.property.images.length - 1;
  });

  getTransformValue = computed(() => {
    const baseOffset = -this.currentImageIndex() * 100;
    const dragOffset = this.isDragging() ? this.dragOffset() : 0;
    return `${baseOffset + dragOffset}%`;
  });

  ngAfterViewInit(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.addEventListener('dragstart', (e: Event) => e.preventDefault());
      this.updateContainerWidth();
      window.addEventListener('resize', this.updateContainerWidth.bind(this));
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateContainerWidth.bind(this));
  }

  private updateContainerWidth = (): void => {
    if (this.carouselContainer) {
      this.containerWidth = this.carouselContainer.nativeElement.offsetWidth;
    }
  };

  nextImage(event: Event): void {
    event.stopPropagation();
    if (this.currentImageIndex() < this.property.images.length - 1) {
      this.currentImageIndex.update(i => i + 1);
    }
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    if (this.currentImageIndex() > 0) {
      this.currentImageIndex.update(i => i - 1);
    }
  }

  goToImage(index: number, event: Event): void {
    event.stopPropagation();
    if (index >= 0 && index < this.property.images.length) {
      this.currentImageIndex.set(index);
    }
  }

  getStatusClass(status: string): string {
    const classes = {
      'Just listed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Sold': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Luxury': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'From developer': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    };
    return classes[status as keyof typeof classes] || '';
  }

  openModal(): void {
    if (!this.hasDragged) {
      this.modalService.openModal(this.property);
    }
    this.hasDragged = false;
  }

  protected onDragStart(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
    this.dragOffset.set(0);
    this.hasDragged = false;

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.dragStartX = clientX;
    this.dragStartIndex = this.currentImageIndex();

    this.updateContainerWidth();
  }

  protected onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging()) return;

    event.preventDefault();
    event.stopPropagation();

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = clientX - this.dragStartX;

    if (Math.abs(deltaX) > 5) {
      this.hasDragged = true;
    }

    const offsetPercent = (deltaX / this.containerWidth) * 100;

    const currentIndex = this.currentImageIndex();
    const totalImages = this.property.images.length;

    let limitedOffset = offsetPercent;

    if (currentIndex === 0 && offsetPercent > 0) {
      limitedOffset = offsetPercent * 0.3;
    } else if (currentIndex === totalImages - 1 && offsetPercent < 0) {
      limitedOffset = offsetPercent * 0.3;
    }

    this.dragOffset.set(limitedOffset);
  }

  protected onDragEnd(event: Event): void {
    if (!this.isDragging()) return;

    event.preventDefault();
    event.stopPropagation();

    const dragOffset = this.dragOffset();
    const totalImages = this.property.images.length;

    const swipeThreshold = 20;

    if (Math.abs(dragOffset) > swipeThreshold) {
      if (dragOffset < -swipeThreshold && this.currentImageIndex() < totalImages - 1) {
        this.currentImageIndex.update(index => index + 1);
      } else if (dragOffset > swipeThreshold && this.currentImageIndex() > 0) {
        this.currentImageIndex.update(index => index - 1);
      }
    }

    this.isDragging.set(false);
    this.dragOffset.set(0);
  }

  protected onTouchStart(event: TouchEvent): void {
    this.onDragStart(event);
  }

  protected onTouchMove(event: TouchEvent): void {
    this.onDragMove(event);
  }
}
