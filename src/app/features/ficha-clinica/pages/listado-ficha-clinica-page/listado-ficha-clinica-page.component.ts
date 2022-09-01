import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { count, map, Observable } from 'rxjs';
import { Ficha } from 'src/app/shared/models/ficha';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import Swal from 'sweetalert2';
import { Categoria } from '../../interfaces/categoria.interface';
import { FichaClinica } from '../../interfaces/ficha_clinica.inteface';
import { SubCategoria } from '../../interfaces/subcategoria.interface';





@Component({
  selector: 'app-listado-ficha-clinica-page',
  templateUrl: './listado-ficha-clinica-page.component.html',
  styleUrls: ['./listado-ficha-clinica-page.component.css']
})
export class ListadoFichaClinicaPageComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;
  subCategorias$!: Observable<SubCategoria[]>;
  fichasClinicas$!: Observable<FichaClinica[]>;
  MatTableDataSource = new MatTableDataSource<FichaClinica>();

  mobileQuery!: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({ length: 50 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.fichasClinicas$.paginator = this.paginator;
  // }
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
