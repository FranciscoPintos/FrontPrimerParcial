import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../../models/categoria';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-edit-categoria-dialog',
  templateUrl: './edit-categoria-dialog.component.html',
  styleUrls: ['./edit-categoria-dialog.component.css']
})
export class EditCategoriaDialogComponent implements OnInit {

  myForm!: FormGroup;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.myForm = this.fb.group({
      id: [this.data?.idCategoria],
      descripcion: [this.data?.descripcion],
    });
  }

  addCategoria() {
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
