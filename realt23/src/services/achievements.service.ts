import { Injectable } from '@angular/core';

export interface Achievement {
  id: string;
  label: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private dummyAchievementsData: Achievement[] = [
    { id: 'lots_new', label: 'Новых объявления сегодня', value: 12 },
    { id: 'lots', label: 'Недвижимость на продажу', value: 150 },
    { id: 'sold', label: 'Продано', value: 500 },
    { id: 'agents', label: 'Экспертные агенты', value: 25 },
    { id: 'developers', label: 'Застройщики', value: 40 },
    { id: 'happy_clients', label: 'Довольные клиенты', value: 500 },
    { id: 'agents_new', label: 'Новых агентов в этом месяце', value: 12 },
  ];

  getAchievements(): Promise<Achievement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.dummyAchievementsData]);
      }, 300); // Simulate network delay
    });
  }

  getAchievementByLabel(label: string): Promise<Achievement | undefined> {
    return Promise.resolve(
      this.dummyAchievementsData.find(a => a.label === label)
    );
  }
}
