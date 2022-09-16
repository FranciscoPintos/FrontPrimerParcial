import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FichaClinicaService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getFichasClinicas(filtro?: any) {
    const url = `/stock-nutrinatalia/fichaClinica`;
    const filter = { ejemplo: filtro };
    const finalUrl = filter.ejemplo
      ? `${url}?ejemplo=${JSON.stringify(filter.ejemplo)}`
      : url;
    console.log('finalUrl');
    console.log(finalUrl);
    return this.httpClient.get(encodeURI(finalUrl)).pipe(
      tap(console.log),
      map((data: any) => data['lista'])
    );
  }

  updateFichaClinica(fichaClinica: any) {
    const usuario = this.authService.getUsuario();

    if (usuario == '') {
      throw new Error('No hay usuario logueado');
    }

    return this.httpClient.put(`/stock-nutrinatalia/fichaClinica`, {
      idFichaClinica: fichaClinica.idFichaClinica,
      ...fichaClinica,
    });
  }

  addFichaClinica(fichaClinica: any) {
    const usuario = this.authService.getUsuario();

    if (usuario == '') {
      throw new Error('No hay usuario logueado');
    }

    const fichaClinicaRequest = {
      idCliente: {
        idPersona: fichaClinica.idCliente,
      },
      idEmpleado: {
        idPersona: fichaClinica.idEmpleado,
      },
      idTipoProducto: {
        idTipoProducto: fichaClinica.subcategoria,
      },
      motivoConsulta: fichaClinica.motivoConsulta,
      observacion: fichaClinica.observacion,
      diagnostico: fichaClinica.diagnostico,
    };
    return this.httpClient.post(
      `/stock-nutrinatalia/fichaClinica`,
      fichaClinicaRequest
    );
  }

  deleteFichaClinica(id: number) {
    return this.httpClient
      .delete(`/stock-nutrinatalia/fichaClinica/${id}`)
      .pipe(tap(console.log));
  }
}
