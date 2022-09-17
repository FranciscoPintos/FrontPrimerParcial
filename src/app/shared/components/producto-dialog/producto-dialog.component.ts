import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { ProductosService } from '../../services/productos.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css'],
})
export class ProductoDialogComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;
  subCategorias$!: Observable<any[]>;
  usuarios$!: Observable<Usuario[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductoDialogComponent>,
    private productoService: ProductosService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    const isEdit = this.data != null;
    this.myForm = this.fb.group({
      codigo: [this.data?.codigo ?? ''],
      flagServicio: [this.data?.flagServicio ?? ''],
      nombre: [this.data?.nombre ?? ''],
      precioVenta: [this.data?.existenciaProducto?.precioVenta ?? ''],
      idProducto: [this.data?.idProducto?.idTipoProducto?.idTipoProducto ?? ''],
    });
    this.subCategorias$ = !isEdit
      ? this.productoService.getSubCategoriasProductos()
      : this.productoService.getSubCategoriasProductosById(
          this.data?.idProducto?.idTipoProducto?.idTipoProducto
        );
  }

  accept() {
    const producto = {
      codigo: this.myForm.get('codigo')?.value,
      flagServicio: this.myForm.get('flagServicio')?.value,
      idProducto: {
        idProducto: this.myForm.get('idProducto')?.value,
      },
      nombre: this.myForm.get('nombre')?.value,
      existenciaProducto: {
        precioVenta: this.myForm.get('precioVenta')?.value,
      },
    };
    this.dialogRef.close(producto);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
