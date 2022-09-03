import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FichaClinicaService {

  constructor(private httpClient: HttpClient) { }

  getFichasClinicas() {
    return this.httpClient.get(`/stock-nutrinatalia/fichaClinica`).pipe(map((data: any) => data['lista']));
  }
}
