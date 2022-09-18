import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FichaClinica } from 'src/app/features/ficha-clinica/interfaces/ficha_clinica.inteface';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { PacienteDialogComponent } from 'src/app/shared/components/paciente-dialog/paciente-dialog.component';
import { ProductoDialogComponent } from 'src/app/shared/components/producto-dialog/producto-dialog.component';
import { PresentacionProducto } from 'src/app/shared/models/presentacionProducto';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrls: ['./pacientes-page.component.css'],
})
export class PacientesPageComponent implements OnInit {
  myForm!: FormGroup;
  personas$!: Observable<PresentacionProducto[]>;
  matTableDataSource = new MatTableDataSource<FichaClinica>();
  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'email',
    'telefono',
    'ruc',
    'cedula',
    'fechaNacimiento',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private personasService: PersonasService
  ) {}

  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
    this.matTableDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nombre: [],
      apellido: [],
    });

    this.personas$ = this.personasService.getPersonas();

    this.personas$.subscribe((data: any) => {
      this.matTableDataSource.data = data;
    });
  }

  deleteElement(element: any) {
    Swal.fire({
      title: '¿Está seguro de eliminar el producto?',
      text: 'No podrá revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personasService.deletePersona(element.idPersona).subscribe(
          (data: any) => {
            this.personasService.getPersonas().subscribe((data: any) => {
              this.matTableDataSource.data = data;
            });

            Swal.fire('Eliminado', 'El paciente ha sido eliminado', 'success');
          },
          (error) => {
            Swal.fire('Error', error.error ?? 'Error Desconocido', 'error');
          }
        );
      }
    });
  }

  applyFilter() {
    console.log(this.myForm.value);

    this.personasService.filterPersonas(this.myForm.value).subscribe(
      (data: any) => {
        this.matTableDataSource.data = data;
      },
      (error) => {
        Swal.fire('Error', error.error ?? 'Error Desconocido', 'error');
      }
    );
  }

  reset() {
    this.myForm.reset();
    this.personasService.getPersonas().subscribe((data: any) => {
      this.matTableDataSource.data = data;
    });
  }

  openDialog(isEdit: boolean, producto?: any): void {
    const dialogRef = this.dialog.open(PacienteDialogComponent, {
      width: '500px',
      data: producto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        if (isEdit) {
          this.personasService
            .updatePersona(producto.idPresentacionProducto, result)
            .subscribe(
              (data: any) => {
                this.personasService.getPersonas().subscribe((data: any) => {
                  this.matTableDataSource.data = data;
                });
                Swal.fire(
                  'Actualizado',
                  'El paciente ha sido actualizado',
                  'success'
                );
              },
              (error) => {
                Swal.fire('Error', error.error ?? 'Error Desconocido', 'error');
              }
            );
        } else {
          this.personasService.addPersona(result).subscribe(
            (data: any) => {
              this.personasService.getPersonas().subscribe((data: any) => {
                this.matTableDataSource.data = data;
              });
              Swal.fire('Agregado', 'El paciente ha sido agregado', 'success');
            },
            (error) => {
              Swal.fire('Error', error.error ?? 'Error Desconocido', 'error');
            }
          );
        }
      }
    });
  }
}
