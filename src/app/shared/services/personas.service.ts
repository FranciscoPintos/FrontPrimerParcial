import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonasService {
  constructor(private httpClient: HttpClient) {}

  getPersonas() {
    return this.httpClient.get('/stock-nutrinatalia/persona').pipe(map((data: any) => data['lista']));
  }

  getPersonaById(id: number) {
    return this.httpClient.get(`/stock-nutrinatalia/persona/${id}`);
  }

  addPersona(persona: any) {
    return this.httpClient.post('/stock-nutrinatalia/persona', persona);
  }

  updatePersona(id: number, persona: any) {
    return this.httpClient.put(`/stock-nutrinatalia/persona/${id}`, persona);
  }

  deletePersona(id: number) {
    return this.httpClient.delete(`/stock-nutrinatalia/persona/${id}`);
  }

  filterPersonas(filter: any) {
    const { nombre, apellido } = filter;
    let ejemplo;
    if (nombre) {
      ejemplo = { nombre };
    }
    if (apellido) {
      ejemplo = { ...ejemplo, apellido };
    }
    const queryUrl = `ejemplo=${JSON.stringify(ejemplo)}`;
    const url = '/stock-nutrinatalia/persona';
    const urlFinal = `${url}?${encodeURI(queryUrl)}${
      nombre || apellido ? `&like=S` : ''
    }`;
    return this.httpClient.get(urlFinal).pipe(map((data: any) => data['lista']));
  }
}
