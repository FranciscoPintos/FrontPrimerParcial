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
  selector: 'app-add-categoria-dialog',
  templateUrl: './add-categoria-dialog.component.html',
  styleUrls: ['./add-categoria-dialog.component.css']
})
export class AddCategoriaDialogComponent implements OnInit {
  myForm!: FormGroup;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddCategoriaDialogComponent>,

  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [],
      descripcion: [],
    });
  }

  addCategoria() {
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
