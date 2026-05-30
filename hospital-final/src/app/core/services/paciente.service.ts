import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente, PacienteRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private url = `${environment.apiUrl}/api/pacientes`;

  constructor(private http: HttpClient) {}

  registrar(request: PacienteRequest): Observable<any> {
    return this.http.post(this.url, request);
  }

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.url}/${id}`);
  }

  buscarPorNombre(nombre: string): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.url}/buscar?nombre=${nombre}`);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
