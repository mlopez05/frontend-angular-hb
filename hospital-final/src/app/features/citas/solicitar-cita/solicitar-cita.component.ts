import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CitasService } from '../../../core/services/citas.service';
import { MedicoService } from '../../../core/services/medico.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-solicitar-cita',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitar-cita.component.html',
  styleUrl: './solicitar-cita.component.css'
})
export class SolicitarCitaComponent implements OnInit {
  loading = false;
  error = '';
  success = '';

  especialidades = [
    { id: 1, nombre: 'Medicina General' },
    { id: 2, nombre: 'Cardiología' },
    { id: 3, nombre: 'Pediatría' },
    { id: 4, nombre: 'Ginecología' },
    { id: 5, nombre: 'Ortopedia' },
    { id: 6, nombre: 'Neurología' },
    { id: 7, nombre: 'Dermatología' }
  ];

  medicosBackend: any[] = [];
  medicosFiltrados: any[] = [];
  slotsDisponibles: any[] = [];

  especialidadId = 0;
  medicoId = 0;
  medicoNombre = '';
  slotId: number | null = null;
  fecha = '';
  hora = '';
  observaciones = '';
  minFecha = '';

  constructor(
    private citasService: CitasService,
    private medicoService: MedicoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    this.minFecha = hoy.toISOString().split('T')[0];

    this.medicoService.listar().subscribe({
      next: (data) => {
        this.medicosBackend = data;
        this.medicosFiltrados = data.map(m => ({
          id: m.id,
          nombre: `${m.nombres} ${m.apellidos}`,
          especialidadId: m.especialidad?.id || 1
        }));
      },
      error: () => {
        this.medicosFiltrados = [
          { id: 1, nombre: 'Carlos Pérez', especialidadId: 1 },
          { id: 2, nombre: 'Ana Rodríguez', especialidadId: 2 }
        ];
      }
    });
  }

  onEspecialidadChange() {
    this.medicoId = 0;
    this.medicoNombre = '';
    this.slotsDisponibles = [];
    this.slotId = null;
    if (this.especialidadId) {
      this.medicosFiltrados = this.medicosBackend.map(m => ({
        id: m.id,
        nombre: `${m.nombres} ${m.apellidos}`,
        especialidadId: m.especialidad?.id || 1
      })).filter(m => m.especialidadId === Number(this.especialidadId));
      if (this.medicosFiltrados.length === 0) {
        this.medicosFiltrados = this.medicosBackend.map(m => ({
          id: m.id,
          nombre: `${m.nombres} ${m.apellidos}`,
          especialidadId: m.especialidad?.id || 1
        }));
      }
    }
  }

  seleccionarMedico(med: any) {
  this.medicoId = med.id;
  this.medicoNombre = med.nombre;
  this.slotId = null;
  this.slotsDisponibles = [];

  this.medicoService.obtenerDisponibilidad(med.id).subscribe({
    next: (data: any) => {
      this.slotsDisponibles = data.slots_disponibles || [];
    },
    error: () => {
      this.slotsDisponibles = [];
    }
  });
}

seleccionarSlot(slot: any) {
  this.slotId = slot.slot_id;
  this.fecha = slot.fecha;
  this.hora = slot.hora_inicio;
}

  onSubmit() {
    if (!this.especialidadId || !this.medicoId || !this.slotId) {
      this.error = 'Por favor selecciona especialidad, médico y horario disponible.';
      return;
    }

    this.loading = true;
    this.error = '';

    const especialidadNombre = this.especialidades.find(e => e.id === Number(this.especialidadId))?.nombre || '';
    const fechaHora = `${this.fecha}T${this.hora}:00`;

    this.citasService.solicitarCita({
      slotId: this.slotId,
      medicoId: Number(this.medicoId),
      fechaHora,
      especialidad: especialidadNombre,
      medicoAsignado: this.medicoNombre,
      observaciones: this.observaciones
    } as any).subscribe({
      next: () => {
        this.loading = false;
        this.success = '¡Cita solicitada exitosamente! Te contactaremos para confirmar.';
        setTimeout(() => this.router.navigate(['/dashboard/mis-citas']), 2500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'No se pudo solicitar la cita. Intenta de nuevo.';
      }
    });
  }
}