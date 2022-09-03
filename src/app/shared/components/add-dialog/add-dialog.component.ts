import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;
  subCategorias$!: Observable<SubCategoria[]>;
  usuarios$!: Observable<Usuario[]>;


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddDialogComponent>,
    private userService: LoginService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      motivoConsulta: [],
      diagnostico: [],
      observacion: [],
      idEmpleado: [],
      idCliente: [],
      categoria: [],
      subcategoria: [],
    });
    this.usuarios$ = this.userService.getPersonas();
    this.categorias$ = this.categoriaService.getCategorias();
    this.subCategorias$ = this.categoriaService.getSubCategorias();

    this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
      console.log(idCategoria);
      this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(idCategoria);
    });
  }

  addFichaClinica() {
    this.dialogRef.close(this.myForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
