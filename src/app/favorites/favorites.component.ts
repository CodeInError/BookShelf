import { Component } from '@angular/core';
import { FavoritesServiceService } from '../ServiceFile/favorites-service.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    NgIf,
    HttpClientModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FavoritesComponent {
  favoriteBooks: any[] = [];
  myFavBooks: any[] = [];
  loadingItemTableData: boolean = false;
  totalBooks: any;

  constructor(private favoritesService: FavoritesServiceService, private msgService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  // Method to load and map the favorite books
  loadFavorites(): void {
    this.favoriteBooks = this.favoritesService.getFavorites();
    console.log('Fav Book Get', this.favoriteBooks);
    this.myFavBooks = this.favoriteBooks.map((item: { volumeInfo: any, id: any }) => {
      this.loadingItemTableData = false;
      const book = item.volumeInfo;
      return {
        id: item.id,
        title: book.title,
        authors: book.authors || [],
        description: book.description || 'No description available',
        thumbnail: book.imageLinks?.smallThumbnail
      };
    });
    this.totalBooks = this.myFavBooks.length;
  }

  confirmDelete(bookId: string) {
    this.confirmationService.confirm({
            // target: event.target as EventTarget,
            message: 'Are you sure that you want to Delete Your favourite Book?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
        accept: () => {
          this.favoriteBooks = this.favoriteBooks.filter(book => book.id !== bookId);
          this.favoritesService.updateFavorites(this.favoriteBooks);
          this.msgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Favorite Book Deleted'
          });
          this.loadFavorites();
        },
        reject: () => {
        }
    });
}
}
