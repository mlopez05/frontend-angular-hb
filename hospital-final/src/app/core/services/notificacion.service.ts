import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private url = `${environment.apiUrl}/api/notificacion`;

  constructor(private http: HttpClient) {}

  listarPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/usuario/${idUsuario}`);
  }

  marcarLeida(id: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}/leido`, {});
  }
}
