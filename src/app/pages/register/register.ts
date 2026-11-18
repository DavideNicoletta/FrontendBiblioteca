import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  email = '';
  password = '';
  error = signal('');

  submit(): void {
    this.error.set('');
    this.auth
      .register({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) =>
          this.error.set(
            err.status === 409 ? 'Username o email già in uso' : 'Registrazione non riuscita',
          ),
      });
  }
}