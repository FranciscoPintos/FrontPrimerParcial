import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { FichaClinica } from 'src/app/features/ficha-clinica/interfaces/ficha_clinica.inteface';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { FichaClinicaService } from 'src/app/features/ficha-clinica/services/ficha-clinica.service';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { ProductoDialogComponent } from 'src/app/shared/components/producto-dialog/producto-dialog.component';
import { Categoria } from 'src/app/shared/models/categoria';
import { PresentacionProducto } from 'src/app/shared/models/presentacionProducto';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ProductosService } from 'src/app/shared/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  myForm!: FormGroup;
  productos$!: Observable<PresentacionProducto[]>;
  subCategorias$!: Observable<SubCategoria[]>;

  fichasClinicas$!: Observable<FichaClinica[]>;
  matTableDataSource = new MatTableDataSource<FichaClinica>();
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'subcategoria',
    'acciones',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private productosService: ProductosService
  ) {}

  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
    this.matTableDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nombre: [],
      subcategoria: [],
    });

    this.productos$ = this.productosService.getProductos();
    this.subCategorias$ = this.categoriaService.getSubCategorias();

    this.productos$.subscribe((data: any) => {
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
        this.productosService
          .deleteProducto(element.idPresentacionProducto)
          .subscribe((data: any) => {
            this.productosService.getProductos().subscribe((data: any) => {
              this.matTableDataSource.data = data;
            });

            Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
          });
      }
    });
  }

  applyFilter() {
    console.log(this.myForm.value);

    this.productosService
      .getProductosByFilter(this.myForm.value)
      .subscribe((data: any) => {
        this.matTableDataSource.data = data;
      });
  }

  reset() {
    this.myForm.reset();
    this.productosService.getProductos().subscribe((data: any) => {
      this.matTableDataSource.data = data;
    });
  }

  openDialog(isEdit: boolean, producto?: any): void {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '500px',
      data: producto,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        if (isEdit) {
          this.productosService
            .updateProducto(producto.idPresentacionProducto, result)
            .subscribe(
              (data: any) => {
                this.productosService.getProductos().subscribe((data: any) => {
                  this.matTableDataSource.data = data;
                });
                Swal.fire(
                  'Actualizado',
                  'El producto ha sido actualizado',
                  'success'
                );
              },
              (error) => {
                Swal.fire('Error', error.error ?? 'Error Desconocido', 'error');
              }
            );
        } else {
          this.productosService.addProducto(result).subscribe(
            (data: any) => {
              this.productosService.getProductos().subscribe((data: any) => {
                this.matTableDataSource.data = data;
              });
              Swal.fire('Agregado', 'El producto ha sido agregado', 'success');
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
