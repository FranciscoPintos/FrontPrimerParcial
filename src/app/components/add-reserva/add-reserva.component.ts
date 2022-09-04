import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Usuario} from "../../auth/interfaces/usuario";
import {MatDialogRef} from "@angular/material/dialog";
import {LoginService} from "../../auth/services/login.service";
import {MatTableDataSource} from "@angular/material/table";
import {Reserva} from "../../reserva/interface/reserva";
import Swal from "sweetalert2";
import {ReservasService} from "../../reserva/services/reservas.service";

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

  allComplete: boolean = false;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddReservaComponent>,
              private userService: LoginService, private reservasService: ReservasService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fecha: [],
      idEmpleado: [],
    });
    this.usuarios$ = this.userService.getPersonas();

    // this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
    //   console.log(idCategoria);
    // });
  }

  addFichaClinica() {
    this.dialogRef.close(this.myForm.value);
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
        }
      });
    }else{
      this.reservasService.getAgendalibre(id, fechaCadena).subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource<Reserva>(data);
        }
      });
    }
    console.log(this.dataSource)

  }

  setCheck(completed: boolean) {
    this.allComplete = completed;

  }


}
