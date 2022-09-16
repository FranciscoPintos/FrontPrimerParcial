import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('usuario');
    return !!user;
  }

  getUsuario(): string {
    return localStorage.getItem('usuario') || '';
  }

  getUsuario(): string {
    return localStorage.getItem('usuario') ?? '';
  }
}
