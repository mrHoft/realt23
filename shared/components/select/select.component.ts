import { Component, input, model, output, signal, computed, effect } from '@angular/core';

export interface SelectOption {
  value: string | null;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [],
  template: `
    <div class="relative w-full">
      <!-- Select trigger -->
      <div
        [class]="containerClass()"
        [class.border-red-500]="showError() && !!errorMessage()"
        (click)="toggleDropdown()"
        (keydown)="onKeyDown($event)"
        tabindex="0"
        role="combobox"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-disabled]="disabled()"
        [attr.aria-invalid]="showError() && !!errorMessage()"
      >
        <span class="block text-left truncate pr-6">
          @if (displayText()) {
            {{ displayText() }}
          } @else {
            <span class="text-gray-500 dark:text-gray-400">{{ placeholder() }}</span>
          }
        </span>

        <svg
          class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform"
          [class.rotate-180]="isOpen()"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Error message -->
      @if (showError() && errorMessage()) {
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ errorMessage() }}
        </p>
      }

      <!-- Dropdown -->
      @if (isOpen()) {
        <div class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500">
          @for (option of options(); track option.value) {
            <div
              class="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 text-left"
              [class.bg-blue-50]="value() === option.value"
              [class.dark:bg-blue-900]="value() === option.value"
              [class.text-gray-400]="option.disabled"
              [class.dark:text-gray-600]="option.disabled"
              [class.cursor-not-allowed]="option.disabled"
              (click)="selectOption(option)"
              (keydown)="onOptionKeyDown($event, option)"
              tabindex="0"
              role="option"
              [attr.aria-selected]="value() === option.value"
              [attr.aria-disabled]="option.disabled"
            >
              {{ option.label }}
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    /* Custom scrollbar styles for WebKit browsers */
    .scrollbar-thin::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    .scrollbar-thin::-webkit-scrollbar-track {
      background: transparent;
    }

    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: #9ca3af; /* gray-400 */
      border-radius: 3px;
    }

    .dark .scrollbar-thin::-webkit-scrollbar-thumb {
      background: #4b5563; /* gray-600 */
    }

    .scrollbar-thin:hover::-webkit-scrollbar-thumb {
      background: #6b7280; /* gray-500 */
    }

    .dark .scrollbar-thin:hover::-webkit-scrollbar-thumb {
      background: #6b7280; /* gray-500 */
    }

    /* For Firefox */
    .scrollbar-thin {
      scrollbar-width: thin;
      scrollbar-color: #9ca3af transparent;
    }

    .dark .scrollbar-thin {
      scrollbar-color: #4b5563 transparent;
    }

    .dark .scrollbar-thin:hover {
      scrollbar-color: #6b7280 transparent;
    }
  `]
})
export class SelectComponent {
  readonly value = model<string | null>(null);
  readonly options = input.required<readonly SelectOption[]>();
  readonly placeholder = input<string>('Select an option');
  readonly disabled = input<boolean>(false);
  readonly errorMessage = input<string>('');
  readonly showError = input<boolean>(false);
  readonly containerClass = input<string>('w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100 cursor-pointer relative flex items-center');

  readonly selectionChange = output<SelectOption>();

  protected readonly isOpen = signal<boolean>(false);

  protected readonly selectedOption = computed(() => {
    const currentOptions = this.options();
    const currentValue = this.value();
    return currentOptions.find(opt => opt.value === currentValue);
  });

  protected readonly displayText = computed(() =>
    this.selectedOption()?.label ?? ''
  );

  constructor() {
    // Ensure change detection runs properly
    effect(() => {
      this.selectedOption(); // Track dependencies
    });
  }

  protected toggleDropdown(): void {
    if (!this.disabled()) {
      this.isOpen.update(open => !open);
    }
  }

  protected selectOption(option: SelectOption): void {
    if (option.disabled) {
      return;
    }

    this.value.set(option.value);
    this.selectionChange.emit(option);
    this.isOpen.set(false);
  }

  protected onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleDropdown();
        break;
      case 'Escape':
        this.isOpen.set(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.isOpen.set(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.isOpen()) {
          this.isOpen.set(false);
        }
        break;
    }
  }

  protected onOptionKeyDown(event: KeyboardEvent, option: SelectOption): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectOption(option);
        break;
    }
  }
}
