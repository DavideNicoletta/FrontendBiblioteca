import { Component, inject, signal } from '@angular/core';

import { Borrow } from '../../models/api.models';
import { BorrowService } from '../../services/borrow.service';

@Component({
  selector: 'app-borrow-list',
  imports: [],
  templateUrl: './borrow-list.html',
  styleUrl: './borrow-list.css',
})
export class BorrowList {
  private readonly borrowService = inject(BorrowService);

  borrows = signal<Borrow[]>([]);
  error = signal('');

  constructor() {
    this.load();
  }

  load(): void {
    this.borrowService.getAll().subscribe({
      next: (borrows) => this.borrows.set(borrows),
      error: () => this.error.set('Impossibile caricare i prestiti'),
    });
  }

  giveBack(borrow: Borrow): void {
    this.borrowService.returnBorrow(borrow.uuid).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Restituzione non riuscita'),
    });
  }
}