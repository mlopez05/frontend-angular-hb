import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../core/services/paciente.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  step = 1;
  loading = false;
  error = '';
  success = '';

  // Paso 1: datos de usuario
  usuario = '';
  nombre = '';
  apellido = '';
  password = '';
  confirmarPassword = '';

  // Paso 2: datos de paciente
  numeroIdentificacion = '';
  fechaNacimiento = '';
  direccion = '';
  telefono = '';
  email = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  nextStep() {
    if (!this.usuario || !this.nombre || !this.apellido || !this.password) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }
    if (this.password !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }
    this.error = '';
    this.step = 2;
  }

  onRegistro() {
    if (!this.numeroIdentificacion || !this.fechaNacimiento || !this.direccion || !this.telefono) {
      this.error = 'Completa todos los campos requeridos.';
      return;
    }
    this.loading = true;
    this.error = '';

    this.pacienteService.registrar({
      numeroIdentificacion: this.numeroIdentificacion,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fechaNacimiento,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.usuario,
      idRecepcionista: 1,
      idSeguro: 1,
      contraseña: this.password,
      rol: 1
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = '¡Registro exitoso! Redirigiendo al login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al registrar el paciente.';
      }
    });
  }
}