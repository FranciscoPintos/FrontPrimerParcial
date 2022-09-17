import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { Categoria } from '../../models/categoria';
import { ProductosService } from '../../services/productos.service';
import { ProductoDialogComponent } from '../producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-paciente-dialog',
  templateUrl: './paciente-dialog.component.html',
  styleUrls: ['./paciente-dialog.component.css'],
})
export class PacienteDialogComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PacienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    const isEdit = this.data != null;
    this.myForm = this.fb.group({
      nombre: [this.data?.nombre ?? ''],
      apellido: [this.data?.nombre ?? ''],
      email: [this.data?.email ?? ''],
      telefono: [this.data?.telefono ?? ''],
      ruc: [this.data?.ruc ?? ''],
      cedula: [this.data?.cedula ?? ''],
      tipoPersona: [this.data?.tipoPersona ?? ''],
      fechaNacimiento: [this.data?.fechaNacimiento ?? ''],
    });
  }

  accept() {
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
