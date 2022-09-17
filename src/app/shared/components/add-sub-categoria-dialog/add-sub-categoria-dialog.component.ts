import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-add-sub-categoria-dialog',
  templateUrl: './add-sub-categoria-dialog.component.html',
  styleUrls: ['./add-sub-categoria-dialog.component.css'],
})
export class AddSubCategoriaDialogComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddSubCategoriaDialogComponent>,

    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      descripcion: [],
      categoria: [],
    });
    this.categorias$ = this.categoriaService.getCategorias();
  }

  addCategoria() {
    //Check if form is valid
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const form = this.myForm.value;
    this.dialogRef.close({
      idCategoria: form.categoria,
      descripcion: form.descripcion,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
