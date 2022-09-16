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
    return this.httpClient.get<any>('/stock-nutrinatalia/persona/'+id+'/agenda?fecha='+fecha);
  }
  getAgendalibre(id:string , fecha:string): Observable<Reserva[]> {
    return this.httpClient.get<any>('/stock-nutrinatalia/persona/'+id+'/agenda?fecha='+fecha+'&disponible=S');
  }

  addReserva(reserva: any) {
    const ReservaRequest = {
      "fechaCadena": reserva.fechaCadena,
      "horaInicioCadena": reserva.horaInicioCadena,
      "horaFinCadena": reserva.horaFinCadena,
      "idEmpleado":{
        "idPersona":reserva.idEmpleado.idPersona
      },
      "idCliente":{
        "idPersona":reserva.idCliente
      },
    };
    return this.httpClient.post(`/stock-nutrinatalia/reserva`, ReservaRequest);
  }

  //hacer delete
  deleteReserva(id:any){
    console.log(id)
    return this.httpClient.delete('/stock-nutrinatalia/reserva/'+id);
  }

///stock-nutrinatalia/persona/4/agenda?fecha=20190903

}
