import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './books/books.component';
import { FavoritesComponent } from './favorites/favorites.component';


export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'books',
        loadComponent: () => import('./books/books.component').then(m => m.BooksComponent)
      },

      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.component').then(m => m.FavoritesComponent)
      },
      {
        path: 'book-details/:id',
        loadComponent: () => import('./book-details/book-details.component').then(m => m.BookDetailsComponent)
      },

];
