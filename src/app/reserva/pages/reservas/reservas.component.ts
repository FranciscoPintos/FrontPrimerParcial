import {ChangeDetectorRef, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators} from "@angular/forms";
import {MatTable, MatTableDataSource} from '@angular/material/table';

import {Reserva} from "../../interface/reserva";
import {Usuario} from "../../../auth/interfaces/usuario";
import {ReservasService} from "../../services/reservas.service";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {coerceStringArray} from "@angular/cdk/coercion";
import {LoginService} from "../../../auth/services/login.service";
import {MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'horaInicio', 'horaFin', 'idEmpleado','idCliente','acciones'];
  dataSource:any;
  empleados:any;
  myForm = new FormGroup({
    empleado: new FormControl <Usuario | null> (null),
    cliente : new FormControl <Usuario | null> (null),
    }
  );

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private fb: FormBuilder, private reservasService: ReservasService
  ,private personaService:LoginService) { }
  ngOnInit(): void {
    this.cargarRerservas();
    this.cargarEmpleados();
  }
  cargarRerservas(){
    this.reservasService.getReservas().subscribe(data => {
      this.dataSource= new MatTableDataSource<Reserva>(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  cargarEmpleados(){
    this.personaService.getPersonas().subscribe(data=>{
      this.empleados=data;
    });
  }
  buscar(){
    const inicio =  this.range.value.start?.toJSON().toString().split("-");
    const fin=this.range.value.end?.toJSON().toString().split("-");
    if(inicio || fin){
      const fechaDesdeCadena = inicio![0] + inicio![1] + inicio![2].substr(0,2);
      const fechaHastaCadena= fin![0]+fin![1]+fin![2].substr(0,2);
      const url={ "idEmpleado": {"idPersona":this.myForm.value.empleado},
        "idCliente": {"idPersona":this.myForm.value.cliente},
        "fechaDesdeCadena": fechaDesdeCadena,
        "fechaHastaCadena": fechaHastaCadena,
      };
      this.reservasService.filtro(encodeURIComponent(JSON.stringify(url))).subscribe(data => {
        this.dataSource=new MatTableDataSource<Reserva>(data);
        this.dataSource.paginator = this.paginator;

      });
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Debes completar la fecha',
        icon: 'error'
      });
      return;
    }



  }

  limpiar(){
    this.cargarRerservas();
    this.myForm.reset();
    this.range.reset();
  }



}
