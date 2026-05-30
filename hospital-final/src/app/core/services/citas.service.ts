import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CitasResponse, SolicitarCitaRequest, ReprogramarCitaRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private url = `${environment.apiUrl}/api/v1/citas`;

  constructor(private http: HttpClient) {}

  getMisCitas(): Observable<CitasResponse> {
    return this.http.get<CitasResponse>(this.url);
  }

  solicitarCita(request: SolicitarCitaRequest): Observable<any> {
    return this.http.post(this.url, request);
  }

  reprogramarCita(id: number, request: ReprogramarCitaRequest): Observable<any> {
    return this.http.patch(`${this.url}/${id}/reprogramar`, request);
  }

  cancelarCita(id: number): Observable<any> {
    return this.http.patch(`${this.url}/${id}/cancelar`, {});
  }
}
