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
    const date = isEdit ? new Date(this.data.fechaNacimiento) : new Date();
    //Add one day to the date
    date.setDate(date.getDate() + 1);
    this.myForm = this.fb.group({
      nombre: [this.data?.nombre ?? ''],
      apellido: [this.data?.nombre ?? ''],
      email: [this.data?.email ?? ''],
      telefono: [this.data?.telefono ?? ''],
      ruc: [this.data?.ruc ?? ''],
      cedula: [this.data?.cedula ?? ''],
      tipoPersona: [this.data?.tipoPersona ?? ''],
      fechaNacimiento: [date],
    });
  }

  accept() {
    console.log(this.myForm.value);
    const date = this.myForm.value.fechaNacimiento;
    //convert date to YYYY-MM-DD hh:mm:ss format
    const dateStr =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds();

    this.dialogRef.close({
      ...this.myForm.value,
      fechaNacimiento: dateStr,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
