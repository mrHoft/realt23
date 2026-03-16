import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-grid-list-toggle',
  standalone: true,
  template: `
    <div class="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow p-1">
      <button
        (click)="viewMode.emit('grid')"
        class="p-2 rounded-md transition-colors"
        [class.bg-blue-600]="currentView === 'grid'"
        [class.text-white]="currentView === 'grid'"
        [class.text-gray-600]="currentView !== 'grid'"
        [class.dark:text-gray-300]="currentView !== 'grid'"
        [class.hover:bg-gray-100]="currentView !== 'grid'"
        [class.dark:hover:bg-gray-700]="currentView !== 'grid'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
      </button>
      <button
        (click)="viewMode.emit('list')"
        class="p-2 rounded-md transition-colors"
        [class.bg-blue-600]="currentView === 'list'"
        [class.text-white]="currentView === 'list'"
        [class.text-gray-600]="currentView !== 'list'"
        [class.dark:text-gray-300]="currentView !== 'list'"
        [class.hover:bg-gray-100]="currentView !== 'list'"
        [class.dark:hover:bg-gray-700]="currentView !== 'list'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linecap="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>
  `
})
export class GridListToggleComponent {
  @Input() currentView: 'grid' | 'list' = 'grid';
  @Output() viewMode = new EventEmitter<'grid' | 'list'>();
}
