import { Component, Input, signal } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { PropertyModalComponent } from '../property-modal/property-modal.component';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [PropertyModalComponent],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <!-- Image carousel -->
      <div class="relative h-48 overflow-hidden group">
        <div class="relative h-full">
          @for (image of property.images; track image; let i = $index) {
            <img
              [src]="image"
              [alt]="property.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              [style.transform]="'translateX(' + (currentImageIndex() - i) * 100 + '%)'"
            >
          }
        </div>

        <!-- Navigation buttons -->
        @if (property.images.length > 1) {
          <button
            (click)="prevImage($event)"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            (click)="nextImage($event)"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <!-- Dots indicator -->
          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
            @for (image of property.images; track image; let i = $index) {
              <div
                class="w-1.5 h-1.5 rounded-full transition-colors"
                [class.bg-white]="currentImageIndex() === i"
                [class.bg-white/50]="currentImageIndex() !== i"
              ></div>
            }
          </div>
        }

        <!-- Status badge -->
        <div class="absolute top-2 left-2">
          <span class="px-2 py-1 text-xs font-semibold rounded-full"
            [class]="getStatusClass(property.status)">
            {{ property.status }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <!-- Agent info and rating -->
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

        <!-- Title and price -->
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1">{{ property.title }}</h3>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ property.price }}</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ property.sqft }} sqft</span>
        </div>

        <!-- Location -->
        <div class="flex items-center text-gray-600 dark:text-gray-300 mb-2">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span class="text-sm">{{ property.location }}</span>
        </div>

        <!-- Description cropped -->
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {{ property.description }}
        </p>

        <!-- Action buttons -->
        <div class="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
          <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
          <button class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
            </svg>
          </button>
          <button
            (click)="openModal()"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Property Modal -->
    @if (showModal()) {
      <app-property-modal
        [property]="property"
        (close)="closeModal()"
      />
    }
  `
})
export class PropertyCardComponent {
  @Input({ required: true }) property!: Property;
  currentImageIndex = signal(0);
  showModal = signal(false);

  nextImage(event: Event): void {
    event.stopPropagation();
    this.currentImageIndex.update(i =>
      i === this.property.images.length - 1 ? 0 : i + 1
    );
  }

  prevImage(event: Event): void {
    event.stopPropagation();
    this.currentImageIndex.update(i =>
      i === 0 ? this.property.images.length - 1 : i - 1
    );
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
    this.showModal.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal.set(false);
    document.body.style.overflow = '';
  }
}
