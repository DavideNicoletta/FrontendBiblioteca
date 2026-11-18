import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Book } from '../../models/api.models';
import { AuthService } from '../../services/auth.service';
import { BookService } from '../../services/book.service';
import { BorrowService } from '../../services/borrow.service';

@Component({
  selector: 'app-book-list',
  imports: [CurrencyPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  private readonly bookService = inject(BookService);
  private readonly borrowService = inject(BorrowService);
  protected readonly auth = inject(AuthService);

  books = signal<Book[]>([]);
  error = signal('');
  message = signal('');

  constructor() {
    this.reload();
  }

  reload(): void {
    this.bookService.getAll().subscribe({
      next: (books) => this.books.set(books),
      error: () => this.error.set('Impossibile caricare i libri'),
    });
  }

  borrow(book: Book): void {
    this.message.set('');
    this.borrowService.create(book.uuid).subscribe({
      next: () => {
        this.message.set(`Hai preso in prestito "${book.title}"`);
        this.reload();
      },
      error: (err) =>
        this.message.set(err.status === 409 ? 'Nessuna copia disponibile' : 'Operazione non riuscita'),
    });
  }
}