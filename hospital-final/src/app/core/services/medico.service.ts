import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private url = `${environment.apiUrl}/api/medico`;

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  registrar(request: any): Observable<any> {
    return this.http.post<any>(this.url, request);
  }

  obtenerDisponibilidad(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}/disponibilidad`);
  }
}
