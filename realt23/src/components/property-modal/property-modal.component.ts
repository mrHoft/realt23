import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, signal, computed, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { CustomCurrencyPipe } from '../../pipe/custom-currency.pipe';

@Component({
  selector: 'app-property-modal',
  standalone: true,
  imports: [CustomCurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (property) {
      <div
        class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm transition-opacity"
        (click)="close.emit()"
      >
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-2xl max-h-[90vh] flex flex-col"
            (click)="$event.stopPropagation()"
          >
            <div class="relative h-64 sm:h-96 shrink-0 overflow-hidden select-none">
              <div
                #carouselContainer
                class="flex h-full transition-transform duration-300 ease-in-out cursor-grab active:cursor-grabbing"
                [style.transform]="'translateX(' + getTransformValue() + ')'"
                [style.transition-duration]="isDragging() ? '0ms' : '300ms'"
                (mousedown)="onDragStart($event)"
                (mousemove)="onDragMove($event)"
                (mouseup)="onDragEnd()"
                (mouseleave)="onDragEnd()"
                (touchstart)="onTouchStart($event)"
                (touchmove)="onTouchMove($event)"
                (touchend)="onDragEnd()"
                (touchcancel)="onDragEnd()"
              >
                @for (image of property.images; track $index) {
                  <img
                    [src]="image"
                    [alt]="property.title"
                    class="w-full h-full object-cover flex-none"
                    draggable="false"
                  >
                }
              </div>

              @if (property.images && property.images.length > 1) {
                <button
                  (click)="prevImage(); $event.stopPropagation()"
                  class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  [class.opacity-50]="!canGoPrev()"
                  [class.cursor-not-allowed]="!canGoPrev()"
                  [disabled]="!canGoPrev()"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  (click)="nextImage(); $event.stopPropagation()"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                  [class.opacity-50]="!canGoNext()"
                  [class.cursor-not-allowed]="!canGoNext()"
                  [disabled]="!canGoNext()"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>

                <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  @for (image of property.images; track $index; let i = $index) {
                    <button
                      (click)="goToImage(i); $event.stopPropagation()"
                      class="w-1.5 h-1.5 rounded-full transition-all"
                      [class.w-4]="currentImageIndex() === i"
                      [class.bg-white]="currentImageIndex() === i"
                      [class.bg-white/50]="currentImageIndex() !== i"
                    ></button>
                  }
                </div>
              }

              <button
                (click)="close.emit(); $event.stopPropagation()"
                class="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div class="p-6 overflow-y-auto">
              <div class="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white break-words pr-4">{{ property.title }}</h3>
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{{ property.price | customCurrency }} {{ property.currency }}</span>
              </div>

              <div class="mb-6 space-y-2">
                <div class="flex items-center text-gray-600 dark:text-gray-300">
                  <svg class="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="font-medium">{{ property.location }}</span>
                </div>
                <div class="flex items-center text-gray-500 dark:text-gray-400 pl-7">
                  <span class="text-sm">{{ property.address }}</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-200">{{ property.square }} кв.м</span>
                </div>
                <div class="flex items-center">
                  <img src="/icons/bedroom.svg" alt="bedroom" class="w-5 h-5 mr-2"/>
                  <span class="text-gray-700 dark:text-gray-200">{{ property.bedrooms }} спален</span>
                </div>
                <div class="flex items-center">
                  <img src="/icons/bathroom.svg" alt="bathroom" class="w-5 h-5 mr-2"/>
                  <span class="text-gray-700 dark:text-gray-200">{{ property.bathrooms }} санузлов</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-200">Построено {{ property.yearBuilt }}</span>
                </div>
              </div>

              <div class="mb-6">
                <span class="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {{ property.type }}
                </span>
              </div>

              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ property.description }}</p>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <div class="flex items-center space-x-3">
                  <img [src]="property.agent.photo" [alt]="property.agent.name" class="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-600">
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-white">{{ property.agent.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Listing Agent</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </button>
                  <button class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .cursor-grab { cursor: grab; }
    .cursor-grabbing { cursor: grabbing; }
    .select-none { user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }
  `]
})
export class PropertyModalComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) property!: Property | null;
  @Output() close = new EventEmitter<void>();
  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  protected currentImageIndex = signal(0);
  protected isDragging = signal(false);
  protected dragOffset = signal(0);

  private dragStartX = 0;
  private dragStartIndex = 0;
  private containerWidth = 0;

  protected canGoPrev = computed(() => {
    const images = this.property?.images;
    return images && images.length > 0 && this.currentImageIndex() > 0;
  });

  protected canGoNext = computed(() => {
    const images = this.property?.images;
    return images && images.length > 0 && this.currentImageIndex() < images.length - 1;
  });

  protected getTransformValue = computed(() => {
    const baseOffset = -this.currentImageIndex() * 100;
    const dragOffset = this.isDragging() ? this.dragOffset() : 0;
    return `${baseOffset + dragOffset}%`;
  });

  public ngAfterViewInit(): void {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.addEventListener('dragstart', (e: Event) => e.preventDefault());
      this.updateContainerWidth();
      window.addEventListener('resize', this.updateContainerWidth.bind(this));
    }
  }

  public ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateContainerWidth.bind(this));
  }

  private updateContainerWidth(): void {
    if (this.carouselContainer) {
      this.containerWidth = this.carouselContainer.nativeElement.offsetWidth;
    }
  }

  public nextImage(): void {
    if (!this.property?.images?.length) return;
    if (this.currentImageIndex() < this.property.images.length - 1) {
      this.currentImageIndex.update(index => index + 1);
    }
  }

  public prevImage(): void {
    if (!this.property?.images?.length) return;
    if (this.currentImageIndex() > 0) {
      this.currentImageIndex.update(index => index - 1);
    }
  }

  public goToImage(index: number): void {
    if (!this.property?.images?.length) return;
    if (index >= 0 && index < this.property.images.length) {
      this.currentImageIndex.set(index);
    }
  }

  protected onDragStart(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
    this.dragOffset.set(0);

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.dragStartX = clientX;
    this.dragStartIndex = this.currentImageIndex();

    this.updateContainerWidth();
  }

  protected onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging()) return;

    event.preventDefault();

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const deltaX = clientX - this.dragStartX; // Reversed: positive when dragging right

    const offsetPercent = (deltaX / this.containerWidth) * 100;

    const currentIndex = this.currentImageIndex();
    const totalImages = this.property?.images?.length || 0;

    let limitedOffset = offsetPercent;

    if (currentIndex === 0 && offsetPercent > 0) {
      limitedOffset = offsetPercent * 0.3;
    } else if (currentIndex === totalImages - 1 && offsetPercent < 0) {
      limitedOffset = offsetPercent * 0.3;
    }

    this.dragOffset.set(limitedOffset);
  }

  protected onDragEnd(): void {
    if (!this.isDragging()) return;

    const dragOffset = this.dragOffset();
    const totalImages = this.property?.images?.length || 0;

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
