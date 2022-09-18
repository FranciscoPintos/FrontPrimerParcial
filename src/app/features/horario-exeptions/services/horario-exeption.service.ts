import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {HorarioExeption} from "../interface/horario-exeption";

@Injectable({
  providedIn: 'root'
})
export class HorarioExeptionService {

  constructor(private httpClient: HttpClient) { }

  getHorario(): Observable<HorarioExeption[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/horarioExcepcion').pipe(map(data => data['lista']));
  }
}
