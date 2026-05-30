import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../core/services/notificacion.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit {
  notificaciones: any[] = [];
  loading = true;
  error = '';

  constructor(private notificacionService: NotificacionService, private authService: AuthService) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    const userId = this.authService.getUserId();
    if (!userId) return;
    this.loading = true;
    this.notificacionService.listarPorUsuario(userId).subscribe({
      next: (data) => { this.notificaciones = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar notificaciones.'; this.loading = false; }
    });
  }

  marcarLeida(id: number) {
    this.notificacionService.marcarLeida(id).subscribe({
      next: () => {
        const n = this.notificaciones.find(x => x.id === id || x.idNotificacion === id);
        if (n) n.leida = true;
      },
      error: () => {}
    });
  }

  noLeidas(): number { return this.notificaciones.filter(n => !n.leida).length; }
}
