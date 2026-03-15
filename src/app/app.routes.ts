import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { CatalogComponent } from '../pages/catalog/catalog.component';
import { PresentationComponent } from '../pages/presentation/presentation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'presentation', component: PresentationComponent },
  { path: '**', redirectTo: '' }
];
