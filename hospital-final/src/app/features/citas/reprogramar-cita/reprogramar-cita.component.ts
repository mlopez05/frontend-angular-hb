import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CitasService } from '../../../core/services/citas.service';
import { MedicoService } from '../../../core/services/medico.service';

@Component({
  selector: 'app-reprogramar-cita',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reprogramar-cita.component.html',
  styleUrl: './reprogramar-cita.component.css'
})
export class ReprogramarCitaComponent implements OnInit {
  citaId = 0;
  loading = false;
  loadingSlots = false;
  error = '';
  success = '';
  medicos: any[] = [];
  medicoSeleccionado: any = null;
  slotsDisponibles: any[] = [];
  slotSeleccionado: any = null;

  constructor(
    private citasService: CitasService,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.citaId = Number(this.route.snapshot.paramMap.get('id'));
    this.medicoService.listar().subscribe({
      next: (data) => this.medicos = data,
      error: () => {}
    });
  }

  seleccionarMedico(medico: any) {
    this.medicoSeleccionado = medico;
    this.slotSeleccionado = null;
    this.slotsDisponibles = [];
    this.loadingSlots = true;
    this.medicoService.obtenerDisponibilidad(medico.id).subscribe({
      next: (data: any) => {
        this.slotsDisponibles = data.slots_disponibles || [];
        this.loadingSlots = false;
      },
      error: () => { this.slotsDisponibles = []; this.loadingSlots = false; }
    });
  }

  seleccionarSlot(slot: any) {
    this.slotSeleccionado = slot;
  }

  onSubmit() {
    if (!this.slotSeleccionado) {
      this.error = 'Por favor selecciona un horario disponible.';
      return;
    }
    this.loading = true;
    this.error = '';
    const nuevaFechaHora = `${this.slotSeleccionado.fecha}T${this.slotSeleccionado.hora_inicio}`;
    this.citasService.reprogramarCita(this.citaId, {
      nuevoSlotId: String(this.slotSeleccionado.slot_id),
      nuevaFechaHora
    }).subscribe({
      next: () => {
        this.loading = false;
        this.success = '¡Cita reprogramada exitosamente!';
        setTimeout(() => this.router.navigate(['/dashboard/mis-citas']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'No se pudo reprogramar. Recuerda que solo puedes reprogramar con más de 24 horas de anticipación.';
      }
    });
  }
}