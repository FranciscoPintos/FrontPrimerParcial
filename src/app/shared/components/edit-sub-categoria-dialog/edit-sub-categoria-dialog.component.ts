import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria';
import { Ficha } from '../../models/ficha';
import { CategoriaService } from '../../services/categoria.service';
import { AddSubCategoriaDialogComponent } from '../add-sub-categoria-dialog/add-sub-categoria-dialog.component';

@Component({
  selector: 'app-edit-sub-categoria-dialog',
  templateUrl: './edit-sub-categoria-dialog.component.html',
  styleUrls: ['./edit-sub-categoria-dialog.component.css'],
})
export class EditSubCategoriaDialogComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSubCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [Number(this.data.idTipoProducto)],
      descripcion: [this.data.descripcion, Validators.required],
      categoria: [this.data.idCategoria.idCategoria, Validators.required],
    });
    this.categorias$ = this.categoriaService.getCategorias();
  }

  addCategoria() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const formValues = this.myForm.value;
    this.dialogRef.close({
      idCategoria: {
        idCategoria: formValues.categoria,
      },
      descripcion: formValues.descripcion,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
