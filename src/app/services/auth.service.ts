import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { ApiResponse, LoginRequest, RegisterRequest } from '../models/api.models';

const API_URL = 'http://localhost:5044/api';
const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly isLoggedIn = computed(() => this.token() !== null);
  readonly isAdmin = computed(() => {
    const token = this.token();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      const role = payload.role;
      return Array.isArray(role) ? role.includes('ROLE_ADMIN') : role === 'ROLE_ADMIN';
    } catch {
      return false;
    }
  });

  login(request: LoginRequest): Observable<void> {
    return this.http
      .post<ApiResponse<string>>(`${API_URL}/auth/login`, request)
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.data);
          this.token.set(res.data);
        }),
        map(() => void 0),
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http
      .post<ApiResponse<unknown>>(`${API_URL}/user`, request)
      .pipe(map(() => void 0));
  }
}