import { Injectable } from '@angular/core';

export interface Achievement {
  label: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private dummyAchievementsData: Achievement[] = [
    { label: 'Недвижимость на продажу', value: 150 },
    { label: 'Продано', value: 500 },
    { label: 'Экспертные агенты', value: 25 },
    { label: 'Застройщики', value: 40 },
    { label: 'Довольные клиенты', value: 500 }
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
