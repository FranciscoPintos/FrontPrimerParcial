import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pais} from "../model/pais";
import {listadatos} from "../model/datos";

@Injectable({
  providedIn: 'root'
})
export class ServicepaisService {
  private api: string ="https://equipoyosh.com/stock-nutrinatalia/pais";
  constructor(private http: HttpClient) {}
  getPaises(): Observable<listadatos<Pais>> {
    return this.http.get<listadatos<Pais>>(this.api);
  }
}
