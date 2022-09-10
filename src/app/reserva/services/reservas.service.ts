import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reserva} from "../interface/reserva";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private httpClient: HttpClient) { }


  getReservas(): Observable<Reserva[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/reserva').pipe(map(data => data['lista']));
  }

  findReserva(reserva: string): Observable<Reserva[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/reserva', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .pipe(map(data => data['lista']))
  }
  filtro(url:string): Observable<Reserva[]>{
    console.log(url);
    return this.httpClient.get<any>('/stock-nutrinatalia/reserva?ejemplo=' + url).pipe(map(data => data['lista']));
  }
  getAgenda(id:string , fecha:string): Observable<Reserva[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/persona/'+id+'/agenda?fecha='+fecha,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }).pipe(tap(console.log) ,map(data => data['lista']));
  }
  getAgendalibre(id:string , fecha:string): Observable<Reserva[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/persona/'+id+'/agenda?fecha='+fecha+'&disponible=S');
  }

///stock-nutrinatalia/persona/4/agenda?fecha=20190903

}
