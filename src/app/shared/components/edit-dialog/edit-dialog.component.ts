import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { Categoria } from '../../models/categoria';
import { Ficha } from '../../models/ficha';
import { CategoriaService } from '../../services/categoria.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';




@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;
  subCategorias$!: Observable<SubCategoria[]>;
  usuarios$!: Observable<Usuario[]>;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddDialogComponent>,
    private userService: LoginService,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("DATA:")
    console.log(this.data);
    this.myForm = this.fb.group({
      motivoConsulta: [this.data?.motivoConsulta??""],
      diagnostico: [this.data?.diagnostico??""],
      observacion: [this.data?.observacion??""],
      idEmpleado: [this.data?.idEmpleado?.idPersona??""],
      idCliente: [this.data?.idCliente?.idPersona??""],
      categoria: [this.data?.idTipoProducto?.idCategoria?.idCategoria??""],
      subcategoria: [this.data?.idTipoProducto?.idTipoProducto??""],
    });
    console.log("form");
    console.log(this.myForm.value);
    this.usuarios$ = this.userService.getPersonas();
    this.categorias$ = this.categoriaService.getCategorias();
    this.subCategorias$ = this.categoriaService.getSubCategorias();

    this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
      this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(idCategoria);
    });
  }

  editFichaClinica() {
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
