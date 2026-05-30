import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegistroRequest, AuthResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/auth/login`, request).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        if (res.id != null) localStorage.setItem('userId', res.id.toString());
      })
    );
  }

  registro(request: RegistroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/auth/registro`, request);
  }

  cambiarContrasena(data: any): Observable<any> {
    return this.http.patch<any>(`${this.url}/auth/cambiar-contrasena`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id) : null;
  }
  isLoggedIn(): boolean { return !!this.getToken(); }
}
