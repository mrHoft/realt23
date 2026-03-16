import { Injectable, signal } from '@angular/core';
import { Property } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = signal<{
    isOpen: boolean;
    property: Property | null;
  }>({
    isOpen: false,
    property: null
  });

  readonly modal = this.modalState.asReadonly();

  openModal(property: Property): void {
    this.modalState.set({ isOpen: true, property });
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.modalState.set({ isOpen: false, property: null });
    document.body.style.overflow = '';
  }
}
