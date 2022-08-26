import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  categorias: Categoria[] = [];
  subCategorias: SubCategoria[] = []

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fromDate: [Date.now()],
      toDate: [Date.now()],
      empleado: [''],
      cliente: [''],
      categoria: [''],
      subcategoria: [''],
    });
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
      this.myForm.patchValue({
        categoria: this.categorias[0].descripcion
      });
    }
    );

    this.categoriaService.getSubCategorias().subscribe(data => {
      this.subCategorias = data;
      this.myForm.patchValue({
        subcategoria: this.subCategorias[0].descripcion
      });
    }
    );
  }

  buscar() {
    console.log(this.myForm.value);
  }

}
