import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { count, map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Categoria } from '../../interfaces/categoria.interface';
import { SubCategoria } from '../../interfaces/subcategoria.interface';

import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-listado-ficha-clinica-page',
  templateUrl: './listado-ficha-clinica-page.component.html',
  styleUrls: ['./listado-ficha-clinica-page.component.css']
})
export class ListadoFichaClinicaPageComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;
  subCategorias$!: Observable<SubCategoria[]>;
  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) { }


  ngOnInit(): void {
    this.myForm = this.fb.group({
      fromDate: [Date.now()],
      toDate: [Date.now()],
      empleado: [''],
      cliente: [''],
      categoria: [1],
      subcategoria: [],
    });
    this.categorias$ = this.categoriaService.getCategorias();
    this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(1);

    this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
      console.log(idCategoria);
      this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(idCategoria);
    });


    this.myForm.valueChanges.subscribe(console.log);
  }

  buscar() {
    console.log(this.myForm.value);
  }

}
