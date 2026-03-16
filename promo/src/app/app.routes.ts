import { Routes } from '@angular/router';
import { PresentationComponent } from '../pages/presentation/presentation.component';

export const routes: Routes = [
  { path: '', component: PresentationComponent },
  { path: 'agent', component: PresentationComponent },
  { path: '**', redirectTo: '' }
];
