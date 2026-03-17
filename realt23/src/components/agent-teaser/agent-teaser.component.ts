import { Component, inject, OnInit, signal } from '@angular/core';
import { AchievementsService } from '../../services/achievements.service';
import { ButtonLinkComponent } from '../button-link/button-link.component';

@Component({
  selector: 'app-agent-teaser',
  imports: [ButtonLinkComponent],
  template: `
    <section class="py-12 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="flex-1">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Вы агент по недвижимости?
            </h2>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Получайте бесплатную аналитику, проверенных клиентов и никаких комиссий платформы
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="flex flex-wrap justify-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                <img src="icons/analytics.svg" alt="" class="link_icon w-4 h-4">
                Бесплатная аналитика
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                <img src="icons/verified_lead.svg" alt="" class="link_icon w-4 h-4">
                Проверенные клиенты
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                <img src="icons/zero_fees.svg" alt="" class="link_icon w-4 h-4">
                Нулевая комиссия
              </span>
            </div>

            <app-button-link routerLink="/agents/onboarding" label="Стать агентом"/>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-white/20 flex flex-wrap justify-center lg:justify-start gap-6">
          <div class="flex items-center gap-2">
            <div class="flex -space-x-2">
              <img src="icons/agent_avatar.svg" alt="" class="link_icon w-6 h-6">
              <img src="icons/agent_avatar.svg" alt="" class="link_icon w-6 h-6">
              <img src="icons/agent_avatar.svg" alt="" class="link_icon w-6 h-6">
            </div>
            <span class="text-white/90 text-sm">
              <span class="font-semibold">{{ agentsJoinedThisMonth() }}+</span> агентов присоединились в этом месяце
            </span>
          </div>
          <div class="flex items-center gap-1">
            <div class="flex">
              <img src="icons/star_filled.svg" alt="" class="link_icon w-4 h-4">
              <img src="icons/star_filled.svg" alt="" class="link_icon w-4 h-4">
              <img src="icons/star_filled.svg" alt="" class="link_icon w-4 h-4">
              <img src="icons/star_filled.svg" alt="" class="link_icon w-4 h-4">
              <img src="icons/star_filled.svg" alt="" class="link_icon w-4 h-4">
            </div>
            <span class="text-white/90 text-sm">
              Оценка {{ agentRating }} агентами
            </span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    section {
      background-size: 200% 200%;
      animation: gradientShift 8s ease infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
  `]
})
export class AgentTeaserComponent implements OnInit {
  private achievementsService = inject(AchievementsService);

  protected agentsJoinedThisMonth = signal<number>(50);
  protected agentRating = 4.9;

  public async ngOnInit(): Promise<void> {
    await this.loadAchievements();
  }

  private async loadAchievements(): Promise<void> {
    try {
      const achievements = await this.achievementsService.getAchievements();
      const newAgentsAchievement = achievements.find(a => a.id === 'agents_new');

      if (newAgentsAchievement) {
        this.agentsJoinedThisMonth.set(newAgentsAchievement.value);
      }
    } catch (error) {
      console.error('Failed to load achievements', error);
    }
  }
}
