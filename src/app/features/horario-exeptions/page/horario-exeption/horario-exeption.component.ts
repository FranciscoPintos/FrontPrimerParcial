import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ScrollStrategy, ScrollStrategyOptions} from "@angular/cdk/overlay";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Usuario} from "../../../auth/interfaces/usuario";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {ReservasService} from "../../../reserva/services/reservas.service";
import {LoginService} from "../../../auth/services/login.service";
import {MatDialog} from "@angular/material/dialog";
import {FichaClinicaService} from "../../../ficha-clinica/services/ficha-clinica.service";
import {MatTableDataSource} from "@angular/material/table";
import {Reserva} from "../../../reserva/interface/reserva";
import Swal from "sweetalert2";
import {AddReservaComponent} from "../../../../shared/components/add-reserva/add-reserva.component";
import {EditReservaComponent} from "../../../../shared/components/edit-reserva/edit-reserva.component";
import {EditDialogComponent} from "../../../../shared/components/edit-dialog/edit-dialog.component";
import {HorarioExeptionService} from "../../services/horario-exeption.service";
import {HorarioExeption} from "../../interface/horario-exeption";

@Component({
  selector: 'app-horario-exeption',
  templateUrl: './horario-exeption.component.html',
  styleUrls: ['./horario-exeption.component.css']
})
export class HorarioExeptionComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'idEmpleado', 'flagEsHabilitar', 'acciones'];
  dataSource: any;
  empleados: any;
  scrollStrategy: ScrollStrategy; //Se utiliza para agregar el scroll a una dialog
  myForm = new FormGroup({
      empleado: new FormControl<Usuario | null>(null),
      cliente: new FormControl<Usuario | null>(null),
    }
  );

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private fb: FormBuilder, private horarioService: HorarioExeptionService
    , private personaService: LoginService, public dialog: MatDialog,
              private fichaClinicasService: FichaClinicaService,
              private readonly sso: ScrollStrategyOptions) {

    this.scrollStrategy = this.sso.noop(); // or close()/block()/reposition()

  }

  ngOnInit(): void {
    this.cargarHorario();
    this.cargarEmpleados();
  }

  cargarHorario() {
    this.horarioService.getHorario().subscribe(data => {
      console.log(data)
      this.dataSource = new MatTableDataSource<HorarioExeption>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  cargarEmpleados() {
    this.personaService.getPersonas().subscribe(data => {
      this.empleados = data;
    });
  }

  buscar() {
    const inicio = this.range.value.start?.toJSON().toString().split("-");
    const fin = this.range.value.end?.toJSON().toString().split("-");
    if (inicio || fin) {
      const fechaDesdeCadena = inicio![0] + inicio![1] + inicio![2].substr(0, 2);
      const fechaHastaCadena = fin![0] + fin![1] + fin![2].substr(0, 2);
      const url = {
        "idEmpleado": {"idPersona": this.myForm.value.empleado},
        "idCliente": {"idPersona": this.myForm.value.cliente},
        "fechaDesdeCadena": fechaDesdeCadena,
        "fechaHastaCadena": fechaHastaCadena,
      };
      // this.reservasService.filtro(encodeURIComponent(JSON.stringify(url))).subscribe(data => {
      //   this.dataSource = new MatTableDataSource<Reserva>(data);
      //   this.dataSource.paginator = this.paginator;
      //
      // });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Debes completar la fecha',
        icon: 'error'
      });
      return;
    }


  }

  limpiar() {
    this.cargarHorario();
    this.myForm.reset();
    this.range.reset();
  }

  openDialog(isEdit: boolean, reserva?: any): void {
    // if (!isEdit) {
    //   const dialogRef = this.dialog.open(AddReservaComponent, {scrollStrategy: this.scrollStrategy});
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //     if (result != null) {
    //       console.log("hay resultados",result);
    //       this.reservasService.addReserva(result);
    //     }
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(EditReservaComponent,{
    //     width: '100%',
    //     data: reserva
    //   });
    //   console.log("ddg")
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //     if (result != null) {
    //       console.log("hay resultados",result);
    //     }
    //   });
    // }

  }


  openDialogFicha(ficha: any): void {
    //
    // const dialogRef = this.dialog.open(EditDialogComponent, {
    //   width: '100%',
    //   data: ficha,
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result != null) {
    //     this.fichaClinicasService.addFichaClinica(result).subscribe((data: any) => {
    //       console.log(data);
    //     });
    //   }
    // });

  }

  deleteReserva(id:any){
    console.log("Eliminar: " + id);
  }



}
