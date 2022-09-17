import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Usuario} from "../../../features/auth/interfaces/usuario";
import {Reserva} from "../../../features/reserva/interface/reserva";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../../features/auth/services/login.service";
import {ReservasService} from "../../../features/reserva/services/reservas.service";
import {MatTableDataSource} from "@angular/material/table";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-edit-reserva',
  templateUrl: './edit-reserva.component.html',
  styleUrls: ['./edit-reserva.component.css']
})
export class EditReservaComponent implements OnInit {

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


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditReservaComponent>,
              private userService: LoginService, private reservasService: ReservasService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    let fechadata = new Date(formatDate(this.data.fecha, 'MM/dd/yyyy', 'en'));
    this.myForm = this.fb.group({
      fecha: [fechadata],
      idEmpleado: [this.data.idEmpleado.idPersona],
      idCliente: [this.data.idCliente.idPersona]
    });
    this.usuarios$ = this.userService.getPersonas();



    // this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
    //   console.log(idCategoria);
    // });
  }

  addReserva() {
    this.reserva.idCliente=this.myForm.value.idCliente;

    console.log(this.reserva);

    // this.dialogRef.close(this.reserva);
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
