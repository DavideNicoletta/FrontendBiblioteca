import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Book, BookRequest } from '../../models/api.models';
import { BookService } from '../../services/book.service';

const EMPTY: BookRequest = { title: '', author: '', isbn: '', price: 0, availableCopies: 1 };

@Component({
  selector: 'app-book-admin',
  imports: [FormsModule],
  templateUrl: './book-admin.html',
  styleUrl: './book-admin.css',
})
export class BookAdmin {
  private readonly bookService = inject(BookService);

  books = signal<Book[]>([]);
  error = signal('');
  form: BookRequest = { ...EMPTY };
  editingUuid: string | null = null;

  constructor() {
    this.load();
  }

  load(): void {
    this.bookService.getAll().subscribe({
      next: (books) => this.books.set(books),
      error: () => this.error.set('Impossibile caricare i libri'),
    });
  }

  edit(book: Book): void {
    this.editingUuid = book.uuid;
    this.form = {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      availableCopies: book.availableCopies,
    };
  }

  reset(): void {
    this.editingUuid = null;
    this.form = { ...EMPTY };
  }

  save(): void {
    this.error.set('');
    const request = this.editingUuid
      ? this.bookService.update(this.editingUuid, this.form)
      : this.bookService.create(this.form);

    request.subscribe({
      next: () => {
        this.reset();
        this.load();
      },
      error: (err) =>
        this.error.set(err.status === 409 ? 'ISBN già esistente' : 'Salvataggio non riuscito'),
    });
  }

  remove(book: Book): void {
    if (!confirm(`Eliminare "${book.title}"?`)) return;
    this.bookService.delete(book.uuid).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Eliminazione non riuscita'),
    });
  }
}