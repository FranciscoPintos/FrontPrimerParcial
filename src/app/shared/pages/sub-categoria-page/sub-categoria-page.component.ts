import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { FichaClinicaService } from 'src/app/features/ficha-clinica/services/ficha-clinica.service';
import Swal from 'sweetalert2';
import { AddDialogComponent } from '../../components/add-dialog/add-dialog.component';
import { AddSubCategoriaDialogComponent } from '../../components/add-sub-categoria-dialog/add-sub-categoria-dialog.component';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { EditSubCategoriaDialogComponent } from '../../components/edit-sub-categoria-dialog/edit-sub-categoria-dialog.component';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-sub-categoria-page',
  templateUrl: './sub-categoria-page.component.html',
  styleUrls: ['./sub-categoria-page.component.css'],
})
export class SubCategoriaPageComponent implements OnInit {
  matTableDataSource = new MatTableDataSource<SubCategoria>();
  subCategorias$!: Observable<SubCategoria[]>;
  displayedColumns: string[] = ['idSubCategoria', 'descripcion', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private fichaClinicasService: FichaClinicaService,
    private userService: LoginService
  ) {}

  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
    this.matTableDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.subCategorias$ = this.categoriaService.getSubCategorias();
    this.subCategorias$.subscribe((data: any) => {
      this.matTableDataSource.data = data;
    });
  }

  openDialog(isEdit: boolean, subCategoria?: any): void {
    if (!isEdit) {
      const dialogRef = this.dialog.open(AddSubCategoriaDialogComponent, {
        width: '100%',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (!result) return;

        const { idCategoria, descripcion } = result;
        console.log('result');
        console.log(result);
        if (result != null) {
          this.categoriaService
            .addSubCategoria(idCategoria, descripcion)
            .subscribe(
              (data: any) => {
                this.subCategorias$ = this.categoriaService.getSubCategorias();
                this.subCategorias$.subscribe((data: any) => {
                  this.matTableDataSource.data = data;
                });

                Swal.fire({
                  title: 'SubCategoria agregada',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                });
              },
              (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'No se pudo agregar la subcategoria',
                  text: error.error,
                });
              }
            );
        }
      });
    } else {
      const dialogRef = this.dialog.open(EditSubCategoriaDialogComponent, {
        width: '100%',
        data: subCategoria,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
        if (result != null) {
          this.categoriaService.updateSubCategoria(result).subscribe(
            (data: any) => {
              this.subCategorias$ = this.categoriaService.getSubCategorias();
              this.subCategorias$.subscribe((data: any) => {
                this.matTableDataSource.data = data;
              });
            },
            (error: any) => {
              Swal.fire({
                icon: 'error',
                title: 'No se pudo actualizar la subcategoria',
                text: error.error,
              });
            }
          );
        }
      });
    }
  }

  deleteElement(subcategoria: Partial<SubCategoria>) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podras revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      console.log(subcategoria);
      if (result.isConfirmed) {
        this.categoriaService
          .deleteSubCategoria(subcategoria.idTipoProducto!)
          .subscribe(
            (data: any) => {
              this.subCategorias$ = this.categoriaService.getSubCategorias();
              this.subCategorias$.subscribe((data: any) => {
                this.matTableDataSource.data = data;
              });

              Swal.fire({
                title: `SubCategoria ${subcategoria.idTipoProducto} eliminada`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            (error: any) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'No se pudo eliminar la subcategoria',
                text: error.error ?? 'Error desconocido',
              });
            }
          );
      }
    });
  }
}
