import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private httpClient: HttpClient) {}

  getProductos() {
    return this.httpClient
      .get(`/stock-nutrinatalia/presentacionProducto`)
      .pipe(map((data: any) => data['lista']));
  }

  getProductosByFilter(filter: any) {
    const { subcategoria, nombre } = filter;
    let ejemplo;

    if (subcategoria) {
      ejemplo = { idProducto: { idTipoProducto: subcategoria } };
    }
    if (nombre) {
      ejemplo = { ...ejemplo, nombre };
    }
    const queryUrl = `ejemplo=${JSON.stringify(ejemplo)}`;

    const url = '/stock-nutrinatalia/presentacionProducto';
    const urlFinal = `${url}?${encodeURI(queryUrl)}${nombre ? `&like=S` : ''}`;
    return this.httpClient
      .get(urlFinal)
      .pipe(map((data: any) => data['lista']));
  }

  getProductoById(id: number) {
    return this.httpClient
      .get(`/stock-nutrinatalia/presentacionProducto/${id}`)
      .pipe(map((data: any) => data['lista']));
  }

  addProducto(producto: any) {
    return this.httpClient.post(
      `/stock-nutrinatalia/presentacionProducto`,
      producto,
      {
        headers: {
          usuario: localStorage.getItem('usuario') || '',
        },
      }
    );
  }

  updateProducto(id: number, producto: any) {
    return this.httpClient.put(
      `/stock-nutrinatalia/presentacionProducto/${id}`,
      producto,
      {
        headers: {
          usuario: localStorage.getItem('usuario') || '',
        },
      }
    );
  }

  getSubCategoriasProductos() {
    const url = encodeURI(`/stock-nutrinatalia/producto`);
    return this.httpClient.get(url).pipe(map((data: any) => data['lista']));
  }

  getSubCategoriasProductosById(id: number) {
    const url = encodeURI(
      `/stock-nutrinatalia/producto?ejemplo={"idTipoProducto":{"idTipoProducto":${id}}}`
    );
    return this.httpClient.get(url).pipe(map((data: any) => data['lista']));
  }

  deleteProducto(id: number) {
    return this.httpClient.delete(
      `/stock-nutrinatalia/presentacionProducto/${id}`
    );
  }
}
