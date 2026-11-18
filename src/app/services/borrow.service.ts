import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ApiResponse, Borrow } from '../models/api.models';

const API_URL = 'http://localhost:5044/api';

@Injectable({ providedIn: 'root' })
export class BorrowService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Borrow[]> {
    return this.http
      .get<ApiResponse<Borrow[]>>(`${API_URL}/borrow`)
      .pipe(map((res) => res.data));
  }

  create(bookUuid: string): Observable<Borrow> {
    return this.http
      .post<ApiResponse<Borrow>>(`${API_URL}/borrow`, { bookUuid })
      .pipe(map((res) => res.data));
  }

  returnBorrow(uuid: string): Observable<Borrow> {
    return this.http
      .put<ApiResponse<Borrow>>(`${API_URL}/borrow/${uuid}/return`, {})
      .pipe(map((res) => res.data));
  }
}