import { Injectable } from '@angular/core';

export interface Achievement {
  label: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private dummyAchievementsData: Achievement[] = [
    { label: 'Properties for sale', value: '150+' },
    { label: 'Properties sold', value: '500+' },
    { label: 'Expert agents', value: '25+' },
    { label: 'Developers', value: '40+' },
    { label: 'Happy clients', value: '500+' }
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
