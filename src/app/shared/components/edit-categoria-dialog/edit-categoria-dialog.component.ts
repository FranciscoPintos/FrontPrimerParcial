import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../../models/categoria';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-edit-categoria-dialog',
  templateUrl: './edit-categoria-dialog.component.html',
  styleUrls: ['./edit-categoria-dialog.component.css'],
})
export class EditCategoriaDialogComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.myForm = this.fb.group({
      id: [Number(this.data.idCategoria)],
      descripcion: [this.data?.descripcion, Validators.required],
    });
  }

  editCategoria() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { id, descripcion } = this.myForm.value;
    this.dialogRef.close({ idCategoria: id, descripcion });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
