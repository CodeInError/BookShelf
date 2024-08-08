import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookManagementService {

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getBooks(query: string = 'test', startIndex: number = 0, maxResults: number = 10): Observable<any> {
    const searchUrl = `${this.apiUrl}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`;
    console.log('Constructed Search URL:', searchUrl);
    return this.http.get<any>(searchUrl);
  }
  

  getBookById(id: string): Observable<any> {
    const bookUrl = `${this.apiUrl}/${id}`;
    console.log('Constructed Book URL:', bookUrl);
    return this.http.get<any>(bookUrl);
  }
}

