import { Component, input } from '@angular/core';
import type { Agent } from '../../interfaces/agent.interface';

@Component({
  selector: 'app-agent-card',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div class="relative h-48 overflow-hidden">
        <img
          [src]="agent().photo"
          [alt]="agent().name"
          class="w-full h-full object-cover"
        >
        <div class="absolute top-3 left-3 flex flex-col gap-2">
          @if (agent().verified) {
            <span class="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <span>🏆</span> Проверен
            </span>
          }
          @if (agent().responseTime < 300) {
            <span class="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <span>⚡</span> Быстрый ответ
            </span>
          }
          @if (agent().expert) {
            <span class="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <span>📍</span> Эксперт
            </span>
          }
        </div>
      </div>

      <div class="p-5">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {{ agent().name }}
        </h3>

        <div class="flex items-center gap-1 mb-2">
          <div class="flex">
            @for (star of [1,2,3,4,5]; track star) {
              <svg
                class="w-4 h-4"
                [class.text-yellow-400]="star <= agent().rating"
                [class.text-gray-300]="star > agent().rating"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          </div>
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ agent().rating.toFixed(1) }}
          </span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <div>
            <span class="text-gray-500 dark:text-gray-400">Сделок:</span>
            <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ agent().deals }}</span>
          </div>
          <div>
            <span class="text-gray-500 dark:text-gray-400">Ответ:</span>
            <span class="ml-1 font-medium text-gray-900 dark:text-white">{{ formatResponseTime(agent().responseTime) }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      flex: none;
      width: 280px;
    }
  `]
})
export class AgentCardComponent {
  public agent = input.required<Agent>();

  protected formatResponseTime(seconds: number): string {
    if (seconds < 60) return '< 1 мин';
    if (seconds < 120) return '1 мин';
    return `${Math.floor(seconds / 60)} мин`;
  }
}
