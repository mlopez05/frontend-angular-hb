import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedicoService } from '../../core/services/medico.service';

@Component({
  selector: 'app-registrar-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-medico.component.html',
  styleUrl: './registrar-medico.component.css'
})
export class RegistrarMedicoComponent {
  loading = false;
  error = '';
  success = '';

  medico = {
    nombres: '',
    apellidos: '',
    numeroColegiado: '',
    especialidad: null as number | null,
    email: '',
    telefono: '',
    hospital: null as number | null,
    direccion: '',
    observacion: ''
  };

  especialidades = [
    { id: 1, nombre: 'Medicina General' },
    { id: 2, nombre: 'Cardiología' },
    { id: 3, nombre: 'Pediatría' },
    { id: 4, nombre: 'Ginecología' },
    { id: 5, nombre: 'Ortopedia' },
    { id: 6, nombre: 'Neurología' },
    { id: 7, nombre: 'Dermatología' }
  ];

  constructor(private medicoService: MedicoService) {}

  onSubmit() {
    if (!this.medico.nombres || !this.medico.apellidos || !this.medico.numeroColegiado ||
        !this.medico.especialidad || !this.medico.email || !this.medico.telefono || !this.medico.hospital) {
      this.error = 'Por favor completa todos los campos obligatorios.';
      return;
    }
    this.loading = true;
    this.error = '';
    this.medicoService.registrar(this.medico).subscribe({
      next: () => {
        this.loading = false;
        this.success = '¡Médico registrado exitosamente!';
        this.medico = { nombres: '', apellidos: '', numeroColegiado: '', especialidad: null, email: '', telefono: '', hospital: null, direccion: '', observacion: '' };
        setTimeout(() => this.success = '', 4000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || err.error?.error?.mensaje || 'Error al registrar médico.';
      }
    });
  }
}
