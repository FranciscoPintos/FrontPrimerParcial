import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { base_url } from 'src/app/base_url';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient) { }

  getCategorias() {
    return this.httpClient.get(`${base_url}/stock-nutrinatalia/categoria`).pipe(map((data: any) => data['lista']));
  }

  getSubCategorias() {
    return this.httpClient.get(`${base_url}/stock-nutrinatalia/tipoProducto`).pipe(map((data: any) => data['lista']));
  }
  getSubCategoriasByCategoriaId(idCategoria: number) {
    const url = `${base_url}/stock-nutrinatalia/tipoProducto?ejemplo={"idCategoria":{"idCategoria": ${idCategoria}}}`;
    return this.httpClient.get(encodeURI(url))
      .pipe(map((data: any) => data['lista']));
  }


}
