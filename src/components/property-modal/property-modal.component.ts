import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-property-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (property) {
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm transition-opacity"
        (click)="close.emit()"
      >
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">

          <!-- Modal Panel -->
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-2xl max-h-[90vh] flex flex-col"
            (click)="$event.stopPropagation()"
          >

            <!-- Images carousel -->
            <div class="relative h-64 sm:h-96 shrink-0">
              @for (image of property.images; track $index; let i = $index) {
                <img
                  [src]="image"
                  [alt]="property.title"
                  class="absolute inset-0 w-full h-full object-cover"
                  [class.hidden]="currentImageIndex !== i"
                >
              }

              @if (property.images && property.images.length > 1) {
                <button
                  (click)="prevImage(); $event.stopPropagation()"
                  class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  (click)="nextImage(); $event.stopPropagation()"
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              }

              <!-- Close button -->
              <button
                (click)="close.emit(); $event.stopPropagation()"
                class="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Scrollable Content Area -->
            <div class="p-6 overflow-y-auto">
              <!-- Title and price -->
              <div class="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white break-words pr-4">{{ property.title }}</h3>
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{{ property.price }}</span>
              </div>

              <!-- Location and address -->
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

              <!-- Specs grid -->
              <div class="grid grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-200">{{ property.sqft }} sqft</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-200">{{ property.bedrooms }} beds</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-200">{{ property.bathrooms }} baths</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-200">Built {{ property.yearBuilt }}</span>
                </div>
              </div>

              <!-- Type -->
              <div class="mb-6">
                <span class="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {{ property.type }}
                </span>
              </div>

              <!-- Description -->
              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ property.description }}</p>
              </div>

              <!-- Agent info -->
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
  `
})
export class PropertyModalComponent {
  @Input({ required: true }) property!: Property | null;
  @Output() close = new EventEmitter<void>();
  currentImageIndex = 0;

  nextImage(): void {
    if (!this.property?.images?.length) return;
    this.currentImageIndex = this.currentImageIndex === this.property.images.length - 1
      ? 0
      : this.currentImageIndex + 1;
  }

  prevImage(): void {
    if (!this.property?.images?.length) return;
    this.currentImageIndex = this.currentImageIndex === 0
      ? this.property.images.length - 1
      : this.currentImageIndex - 1;
  }
}
