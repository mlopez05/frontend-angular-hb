import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  usuario = '';
  contrasenaActual = '';
  nuevaContrasena = '';
  loading = false;
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.usuario || !this.contrasenaActual || !this.nuevaContrasena) {
      this.error = 'Todos los campos son obligatorios.'; return;
    }
    if (this.nuevaContrasena.length < 6) {
      this.error = 'La nueva contraseña debe tener al menos 6 caracteres.'; return;
    }
    this.loading = true;
    this.error = '';
    this.authService.cambiarContrasena({ usuario: this.usuario, contrasenaActual: this.contrasenaActual, nuevaContrasena: this.nuevaContrasena }).subscribe({
      next: () => {
        this.loading = false;
        this.success = '¡Contraseña cambiada exitosamente!';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al cambiar la contraseña.';
      }
    });
  }
}
