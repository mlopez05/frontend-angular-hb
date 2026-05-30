import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionService } from '../../core/services/notificacion.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  menuOpen = false;
  notificacionesSinLeer = 0;

  constructor(
    private authService: AuthService,
    private notificacionService: NotificacionService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.notificacionService.listarPorUsuario(userId).subscribe({
        next: (data) => this.notificacionesSinLeer = data.filter((n: any) => !n.leida).length,
        error: () => {}
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
