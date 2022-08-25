import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, take, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getPersonas(): Observable<Usuario[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/persona').pipe(map(data => data['lista']));
  }

  findPersona(usuario: string): Observable<Usuario[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/persona')
      .pipe(map(data => data['lista']))
  }

  getPersonasDelSistema(): Observable<Usuario[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/persona').pipe(map(data => data['lista']), filter(data => data['soloUsuariosDelSistema']));
  }
}
