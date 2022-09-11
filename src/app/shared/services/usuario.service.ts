import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) {

  }
  obtenerUsuariosDelSistema(): Observable<Usuario[]> {
    const url = '/stock-nutrinatalia/persona';
    const queryUrl = `ejemplo={"soloUsuariosDelSistema":true}`;
    const urlFinal = `${url}?${encodeURI(queryUrl)}`;
    return this.httpClient.get<Usuario[]>(urlFinal).pipe(map((data: any) => data['lista']));
  }

  esUsuarioDelSistema(usuario: string): Observable<boolean> {
    return this.obtenerUsuariosDelSistema()
      .pipe(
        tap(console.log),
        map((usuarios: Usuario[]) => usuarios.find((u: Usuario) => u.usuarioLogin == usuario) != undefined),
      );
  }

}
