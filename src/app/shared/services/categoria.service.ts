import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private httpClient: HttpClient) {}

  getCategorias() {
    return this.httpClient
      .get(`/stock-nutrinatalia/categoria`)
      .pipe(map((data: any) => data['lista']));
  }

  getSubCategorias() {
    return this.httpClient
      .get(`/stock-nutrinatalia/tipoProducto`)
      .pipe(map((data: any) => data['lista']));
  }

  getSubCategoriasByCategoriaId(idCategoria: number) {
    const url = `/stock-nutrinatalia/tipoProducto?ejemplo={"idCategoria":{"idCategoria": ${idCategoria}}}`;
    return this.httpClient
      .get(encodeURI(url))
      .pipe(map((data: any) => data['lista']));
  }

  addCategoria(categoria: Partial<Categoria>) {
    return this.httpClient.post(`/stock-nutrinatalia/categoria`, {
      descripcion: categoria.descripcion,
    });
  }

  addSubCategoria(idCategoria: number, descripcionSubCategoria: string) {
    return this.httpClient.post(`/stock-nutrinatalia/tipoProducto`, {
      idCategoria: {
        idCategoria,
      },
      descripcion: descripcionSubCategoria,
    });
  }

  updateCategoria(categoria: any) {
    return this.httpClient.put(`/stock-nutrinatalia/categoria`, categoria);
  }

  updateSubCategoria(id: number, subCategoria: any) {
    return this.httpClient.put(
      `/stock-nutrinatalia/tipoProducto/${id}`,
      subCategoria
    );
  }

  deleteCategoria(idCategoria: number) {
    return this.httpClient.delete(
      `/stock-nutrinatalia/categoria/${idCategoria}`
    );
  }

  deleteSubCategoria(idSubCategoria: number) {
    return this.httpClient.delete(
      `/stock-nutrinatalia/tipoProducto/${idSubCategoria}`
    );
  }
}
