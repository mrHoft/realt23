import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-link',
  imports: [RouterLink],
  template: `
    <a [routerLink]="routerLink()" class="inline-flex items-center whitespace-nowrap px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group cursor-pointer">
      {{ label() }}
      @if (showIcon()) {
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      }
    </a>
  `
})
export class ButtonLinkComponent {
  public readonly routerLink = input.required<string>();
  public readonly label = input.required<string>();
  public readonly showIcon = input<boolean>(true);
}
