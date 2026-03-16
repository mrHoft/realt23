import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cta-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Связаться с менеджером
          </h2>
          <p class="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Получите индивидуальную помощь в поиске недвижимости вашей мечты
          </p>

          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                [(ngModel)]="formData.name"
                name="name"
                placeholder="Ваше имя"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              >
              <input
                type="email"
                [(ngModel)]="formData.email"
                name="email"
                placeholder="Email адрес"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              >
            </div>
            <input
              type="tel"
              [(ngModel)]="formData.phone"
              name="phone"
              placeholder="Номер телефона"
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            >
            <textarea
              [(ngModel)]="formData.message"
              name="message"
              placeholder="Текст сообщения"
              rows="4"
              class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Отправить сообщение
            </button>
          </form>
        </div>
      </div>
    </section>
  `
})
export class CtaFormComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  onSubmit(): void {
    console.log('Form submitted:', this.formData);
    alert('Thank you for your message! Our manager will contact you soon.');
    this.formData = { name: '', email: '', phone: '', message: '' };
  }
}
