import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { FichaClinicaService } from 'src/app/features/ficha-clinica/services/ficha-clinica.service';
import Swal from 'sweetalert2';
import { AddCategoriaDialogComponent } from '../../components/add-categoria-dialog/add-categoria-dialog.component';
import { AddDialogComponent } from '../../components/add-dialog/add-dialog.component';
import { EditCategoriaDialogComponent } from '../../components/edit-categoria-dialog/edit-categoria-dialog.component';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css'],
})
export class CategoriaPageComponent implements OnInit {
  matTableDataSource = new MatTableDataSource<Categoria>();
  categorias$!: Observable<Categoria[]>;
  displayedColumns: string[] = ['idCategoria', 'descripcion', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
  ) {}

  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
    this.matTableDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.getCategorias();
    this.categorias$.subscribe((data: any) => {
      this.matTableDataSource.data = data;
    });
  }

  openDialog(isEdit: boolean, ficha_clinica?: any): void {
    if (!isEdit) {
      const dialogRef = this.dialog.open(AddCategoriaDialogComponent, {
        width: '40%',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result != null) {
          this.categoriaService.addCategoria(result).subscribe(
            (data: any) => {
              this.categorias$ = this.categoriaService.getCategorias();
              this.categorias$.subscribe((data: any) => {
                this.matTableDataSource.data = data;
              });

              Swal.fire({
                position: 'top-end',
                icon: 'success',
                width: '20%',
                title: 'Categoria agregada correctamente',
                showConfirmButton: false,
                timer: 1500,
              });
            },
            (error) => {
              console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'No se pudo agregar la categoria',
              text: error.error,
            });
            }
          );
        }
      });
    } else {
      const dialogRef = this.dialog.open(EditCategoriaDialogComponent, {
        width: '100%',
        data: ficha_clinica,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
        if (result != null) {
          this.categoriaService.updateCategoria(result).subscribe(
            (data: any) => {
              this.categorias$ = this.categoriaService.getCategorias();
              this.categorias$.subscribe((data: any) => {
                this.matTableDataSource.data = data;
              });
            },
            (error) => {
              console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'No se pudo editar la categoria',
              text: error.error,
            });
            }
          );
        }
      });
    }
  }

  deleteElement(categoria: Partial<Categoria>) {
    //Ask for confirmation
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrá revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.deleteCategoria(categoria.idCategoria!).subscribe(
          (data: any) => {
            this.categorias$ = this.categoriaService.getCategorias();
            this.categorias$.subscribe((data: any) => {
              this.matTableDataSource.data = data;
            });
            Swal.fire(
              'Eliminado!',
              'La categoria ha sido eliminada.',
              'success'
            );
          },
          (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'No se pudo eliminar la categoria',
              text: error.error,
            });
          }
        );
      }
    });
  }
}
