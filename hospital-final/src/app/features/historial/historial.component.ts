import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialService } from '../../core/services/historial.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  registros: any[] = [];
  loading = false;
  error = '';
  buscado = false;

  constructor(
    private historialService: HistorialService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    console.log('userId:', userId);
    if (userId) {
      this.loading = true;
      this.buscado = true;
      this.historialService.consultarHistorial(userId).subscribe({
        next: (data: any) => {
          console.log('historial data:', data);
          this.registros = data.registros || data.data?.registros || [];
          this.loading = false;
        },
        error: (err) => {
          console.log('historial error:', err);
          this.error = 'No se pudo cargar el historial médico.';
          this.loading = false;
        }
      });
    } else {
      console.log('No hay userId en localStorage');
      this.error = 'Sesión no válida. Por favor inicia sesión de nuevo.';
    }
  }
}