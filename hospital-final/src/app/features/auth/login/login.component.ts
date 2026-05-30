import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario = '';
  password = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.usuario || !this.password) {
      this.error = 'Por favor ingrese usuario y contraseña.';
      return;
    }
    this.loading = true;
    this.error = '';

    this.authService.login({ usuario: this.usuario, contraseña: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Usuario o contraseña incorrectos.';
      }
    });
  }
}