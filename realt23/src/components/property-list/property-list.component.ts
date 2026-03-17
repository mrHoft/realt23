import { Component, Input, signal, inject } from '@angular/core';
import { Property } from '../../interfaces/property.interface';
import { PropertyCardComponent } from './property-card.component';
import { GridListToggleComponent } from '../grid-list-toggle/grid-list-toggle.component';
import { ModalService } from '../../services/modal.service';
import { PropertyModalComponent } from '../property-modal/property-modal.component';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [
    PropertyCardComponent,
    GridListToggleComponent,
    PropertyModalComponent
  ],
  template: `
    <div class="flex justify-between items-center mb-6">
      <p class="text-gray-600 dark:text-gray-300">
        Найдено {{ properties.length }} объектов недвижимости
      </p>
      <app-grid-list-toggle
        [currentView]="viewMode()"
        (viewMode)="viewMode.set($event)"
      />
    </div>

    @if (loading) {
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }

    @if (!loading) {
      <div
        class="grid gap-6"
        [class.grid-cols-1]="viewMode() === 'list'"
        [class.md:grid-cols-2]="viewMode() === 'grid'"
        [class.lg:grid-cols-3]="viewMode() === 'grid'"
      >
        @for (property of properties; track property.id) {
          <app-property-card [property]="property" />
        }
      </div>
    }

    @if (!loading && properties.length === 0) {
      <div class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-300 text-lg">
          Объекты, соответствующие вашим критериям, не найдены.
        </p>
      </div>
    }

    @if (modalService.modal().isOpen) {
      <app-property-modal
        [property]="modalService.modal().property!"
        (close)="modalService.closeModal()"
      />
    }
  `
})
export class PropertyListComponent {
  @Input({ required: true }) properties: Property[] = [];
  @Input({ required: true }) loading: boolean = false;

  viewMode = signal<'grid' | 'list'>('grid');
  protected modalService = inject(ModalService);
}
