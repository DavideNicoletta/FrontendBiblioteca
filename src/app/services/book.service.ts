import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ApiResponse, Book, BookRequest } from '../models/api.models';

const API_URL = 'http://localhost:5044/api';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Book[]> {
    return this.http
      .get<ApiResponse<Book[]>>(`${API_URL}/book`)
      .pipe(map((res) => res.data));
  }

  create(book: BookRequest): Observable<Book> {
    return this.http.post<ApiResponse<Book>>(`${API_URL}/book`, book).pipe(map((res) => res.data));
  }

  update(uuid: string, book: BookRequest): Observable<Book> {
    return this.http.put<ApiResponse<Book>>(`${API_URL}/book/${uuid}`, book).pipe(map((res) => res.data));
  }

  delete(uuid: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/book/${uuid}`);
  }
}