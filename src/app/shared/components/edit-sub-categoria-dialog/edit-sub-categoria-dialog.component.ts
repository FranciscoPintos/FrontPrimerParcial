import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria';
import { Ficha } from '../../models/ficha';
import { CategoriaService } from '../../services/categoria.service';
import { AddSubCategoriaDialogComponent } from '../add-sub-categoria-dialog/add-sub-categoria-dialog.component';

@Component({
  selector: 'app-edit-sub-categoria-dialog',
  templateUrl: './edit-sub-categoria-dialog.component.html',
  styleUrls: ['./edit-sub-categoria-dialog.component.css']
})
export class EditSubCategoriaDialogComponent implements OnInit {


  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditSubCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [],
      descripcion: [],
      categoria: [],
    });
    this.categorias$ = this.categoriaService.getCategorias();
  }

  addCategoria() {
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
