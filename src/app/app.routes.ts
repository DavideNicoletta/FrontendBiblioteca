import { Routes } from '@angular/router';
import { BookList } from './pages/book-list/book-list';
import { Login } from './pages/login/login';
import { BorrowList } from './pages/borrow-list/borrow-list';
import { adminGuard, authGuard } from './core/auth.guard';
import { BookAdmin } from './pages/book-admin/book-admin';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList },
  { path: 'login', component: Login },
  { path: 'borrows', component: BorrowList, canActivate: [authGuard] },
  { path: 'admin/books', component: BookAdmin, canActivate: [authGuard, adminGuard] },
  { path: 'register', component: Register },
];