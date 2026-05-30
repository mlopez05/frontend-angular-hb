import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private url = `${environment.apiUrl}/api/historial-medico`;

  constructor(private http: HttpClient) {}

  consultarHistorial(pacienteId: number, page = 1, limit = 10): Observable<any> {
    return this.http.get<any>(`${this.url}/pacientes/${pacienteId}/registros?page=${page}&limit=${limit}&sort=desc`);
  }

  crearRegistro(request: any): Observable<any> {
    return this.http.post<any>(`${this.url}/registros`, request);
  }
}
