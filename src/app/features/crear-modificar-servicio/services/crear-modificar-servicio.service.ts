import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrearModificarServicioService {

  constructor(private httpClient: HttpClient) { }

  getServicios() {
	return this.httpClient.get(`/stock-nutrinatalia/servicio`).pipe(map((data: any) => data['lista']));
  }

}
