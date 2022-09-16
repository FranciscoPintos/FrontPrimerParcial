import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Usuario} from "../../../features/auth/interfaces/usuario";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../../features/auth/services/login.service";
import {MatTableDataSource} from "@angular/material/table";
import {Reserva} from "../../../features/reserva/interface/reserva";
import Swal from "sweetalert2";
import {ReservasService} from "../../../features/reserva/services/reservas.service";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {SelectionModel} from "@angular/cdk/collections";


@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.component.html',
  styleUrls: ['./add-reserva.component.css']
})
export class AddReservaComponent implements OnInit {
  displayedColumns: string[] = ['horaInicio', 'horaFin', 'idCliente', 'acciones'];
  dataSource: any;
  myForm!: FormGroup;
  usuarios$!: Observable<Usuario[]>;
  values = [{'horaInicio': null, 'horaFin': null, 'idCliente': null}]
  reserva!:Reserva;

  allComplete: boolean = false;
  selected:boolean=false;

  selection = new SelectionModel<any>(false, []);

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddReservaComponent>,
              private userService: LoginService, private reservasService: ReservasService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fecha: [],
      idEmpleado: [],
      idCliente: []
    });
    this.usuarios$ = this.userService.getPersonas();


    // this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
    //   console.log(idCategoria);
    // });
  }

  addReserva() {
    this.reserva.idCliente=this.myForm.value.idCliente;


    this.dialogRef.close(this.reserva);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buscar() {
    const formvalues = this.myForm.value;
    console.log(formvalues);
    const fecha = formvalues.fecha.toJSON().toString().split("-");
    const id = formvalues.idEmpleado;
    const fechaCadena = fecha![0] + fecha![1] + fecha![2].substr(0, 2);
    if (this.allComplete) {
      this.reservasService.getAgenda(id, fechaCadena).subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource<Reserva>(data);
          this.dataSource.paginator = this.paginator;
        }
        console.log("Data: lleno", data);
      });
    }else{
      this.reservasService.getAgendalibre(id, fechaCadena).subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource<Reserva>(data);
          this.dataSource.paginator = this.paginator;
        }
        console.log("Data: Libre", data);
      });
    }
    console.log(this.dataSource)

  }

  setCheck(completed: boolean) {
    this.allComplete = completed;
  }
  setSelected(reserva:any){
    // this.selected=select;
    this.reserva=reserva;
  }

  setHorario(reserva:any){
      this.reserva=reserva;

  }

}
