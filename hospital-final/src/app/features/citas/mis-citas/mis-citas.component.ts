import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CitasService } from '../../../core/services/citas.service';
import { Cita } from '../../../core/models/models';

@Component({
  selector: 'app-mis-citas',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-citas.component.html',
  styleUrl: './mis-citas.component.css'
})
export class MisCitasComponent implements OnInit {
  citasFuturas: Cita[] = [];
  citasPasadas: Cita[] = [];
  loading = true;
  error = '';
  success = '';
  tab: 'futuras' | 'pasadas' = 'futuras';

  constructor(private citasService: CitasService, private router: Router) {}

  ngOnInit() { this.cargarCitas(); }

  cargarCitas() {
    this.loading = true;
    this.citasService.getMisCitas().subscribe({
      next: (res) => {
        this.citasFuturas = res.citasFuturas || [];
        this.citasPasadas = res.citasPasadas || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'No fue posible cargar sus citas médicas.';
        this.loading = false;
      }
    });
  }

  reprogramar(id: number) {
    this.router.navigate(['/dashboard/reprogramar-cita', id]);
  }

  cancelar(id: number) {
    if (!confirm('¿Estás seguro de que deseas cancelar esta cita?')) return;
    this.citasService.cancelarCita(id).subscribe({
      next: () => {
        this.success = 'Cita cancelada exitosamente.';
        this.cargarCitas();
        setTimeout(() => this.success = '', 3000);
      },
      error: () => this.error = 'No se pudo cancelar la cita.'
    });
  }

  getBadgeClass(estado: string): string {
    const map: Record<string, string> = {
      'PENDIENTE': 'badge-pendiente', 'CONFIRMADA': 'badge-confirmada',
      'CANCELADA': 'badge-cancelada', 'COMPLETADA': 'badge-completada',
      'programada': 'badge-confirmada', 'completada': 'badge-completada',
      'cancelada': 'badge-cancelada'
    };
    return map[estado] || 'badge-pendiente';
  }

  formatFecha(fechaHora: string): string {
    if (!fechaHora) return '';
    return new Date(fechaHora).toLocaleDateString('es-GT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  formatHora(fechaHora: string): string {
    if (!fechaHora) return '';
    return new Date(fechaHora).toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' });
  }
}
