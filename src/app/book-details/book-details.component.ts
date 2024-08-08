import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookManagementService } from '../ServiceFile/book-management.service';
import { CommonModule } from '@angular/common';
import { FavoritesServiceService } from '../ServiceFile/favorites-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, ToastModule, ButtonModule, RippleModule,TooltipModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  providers: [MessageService]
})
export class BookDetailsComponent {

  book: any;
  bookAllValue: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookManagementService,
    private favoritesService: FavoritesServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('get Id',id)

    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (response: any) => {
          this.bookAllValue = response;
          this.book = response.volumeInfo;
          console.log('All Book details',this.book)
        },
        error: (error: any) => {
          console.error('Error fetching book details:', error);
        }
      });
    }
  }

  addToFavorites(bookAllValue: any): void {
    const favorites = this.favoritesService.getFavorites();
    console.log('my id',bookAllValue)
  
    const existingBook = favorites.find(b => b.id === bookAllValue.id);
  
    if (existingBook) {
      console.log('Already Added');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Book is already added to favorites'
      });
    } else {
      console.log('My Fav Book');
      this.favoritesService.addBookToFavorites(bookAllValue);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Book added to favorites'
      });
    }
  }
  

}
