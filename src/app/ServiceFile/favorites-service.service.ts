import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesServiceService {
  private favorites: any[] = [];

  constructor() { 
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  addBookToFavorites(bookAllValue: any): void {
    console.log('Add Fav Book', bookAllValue);
    this.favorites.push(bookAllValue);
    this.saveFavorites();
    this.updateLocalStorage();
    
  }

  getFavorites(): any[] {
    console.log('Get Fav Book', this.favorites);
    return this.favorites;
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  updateFavorites(updatedFavorites: any[]): void {
    this.favorites = updatedFavorites;
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
