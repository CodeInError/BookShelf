import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookManagementService } from '../ServiceFile/book-management.service';
import { debounceTime, tap } from 'rxjs/operators';
import { CommonModule, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    NgIf
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {

  books: any[] = [];
  filteredBooks: any[] = [];
  searchControl = new FormControl();
  totalBooks: number = 0; // Add a variable to keep track of the total number of books

  constructor(private bookService: BookManagementService, private router: Router) { }

  ngOnInit(): void {
    this.fetchBooks();

    // Filter books based on search input
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Delay to wait for user input
      tap(searchTerm => this.filterBooks(searchTerm))
    ).subscribe();
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.books = response.items.map((item: { volumeInfo: any, id: any }) => {
          const book = item.volumeInfo;
          return {
            id: item.id,
            title: book.title,
            authors: book.authors || [],
            description: book.description || 'No description available',
            thumbnail: book.imageLinks?.smallThumbnail
          };
        });
        this.filteredBooks = this.books; // Initialize filteredBooks with all books
        this.totalBooks = this.books.length; // Set the total number of books
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  filterBooks(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredBooks = this.books; // If no search term, show all books
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some((author: string) => author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }

  viewMore(book: any): void {
    this.router.navigate(['/book-details', book.id]);
  }
  
}
