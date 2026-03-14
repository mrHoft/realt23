import { Component } from '@angular/core';

@Component({
  selector: 'app-achievements',
  standalone: true,
  template: `
    <section class="py-16 bg-gray-50 dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
          @for (achievement of achievements; track achievement.label) {
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {{ achievement.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-300">
                {{ achievement.label }}
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class AchievementsComponent {
  achievements = [
    { label: 'Properties for sale', value: '150+' },
    { label: 'Properties sold', value: '500+' },
    { label: 'Expert agents', value: '25+' },
    { label: 'Developers', value: '40+' },
    { label: 'Happy clients', value: '500+' }
  ];
}
