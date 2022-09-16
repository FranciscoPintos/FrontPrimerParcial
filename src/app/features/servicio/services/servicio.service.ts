import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private httpClient: HttpClient) { }

  getFichasClinicas(filtro?: any) {
    const url = `/stock-nutrinatalia/servicio`;
    const filter = { ejemplo: filtro };
    const finalUrl = filter.ejemplo ? `${url}?ejemplo=${JSON.stringify(filter.ejemplo)}` : url;
    console.log("finalUrl");
    console.log(finalUrl);
    return this.httpClient.get(encodeURI(finalUrl)).pipe(tap(console.log), map((data: any) => data['lista']));
  }

  updateFichaClinica(fichaClinica: any) {
    console.log(fichaClinica);
    return this.httpClient.put(`/stock-nutrinatalia/servicio`, fichaClinica);
  }


  addFichaClinica(fichaClinica: any) {
    const fichaClinicaRequest = {
      "idCliente": {
        "idPersona": fichaClinica.idCliente,
      },
      "idEmpleado": {
        "idPersona": fichaClinica.idEmpleado,
      },
      "idTipoProducto": {
        "idTipoProducto": fichaClinica.subcategoria,
      },
      "motivoConsulta": fichaClinica.motivoConsulta,
      "observacion": fichaClinica.observacion,
      "diagnostico": fichaClinica.diagnostico,
    };
    return this.httpClient.post(`/stock-nutrinatalia/servicio`, fichaClinicaRequest);
  }
}
