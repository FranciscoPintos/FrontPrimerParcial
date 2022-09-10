import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { FichaClinica } from '../../interfaces/ficha_clinica.inteface';
import { SubCategoria } from '../../interfaces/subcategoria.interface';
import { FichaClinicaService } from '../../services/ficha-clinica.service';

@Component({
  selector: 'app-listado-ficha-clinica-page',
  templateUrl: './listado-ficha-clinica-page.component.html',
  styleUrls: ['./listado-ficha-clinica-page.component.css']
})
export class ListadoFichaClinicaPageComponent implements OnInit {
  myForm!: FormGroup;
  categorias$!: Observable<Categoria[]>;
  subCategorias$!: Observable<SubCategoria[]>;
  usuarios$!: Observable<Usuario[]>;


  fichasClinicas$!: Observable<FichaClinica[]>;
  matTableDataSource = new MatTableDataSource<FichaClinica>();
  displayedColumns: string[] = ['fecha', 'profesional', 'cliente', 'categoria', 'subcategoria', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private fichaClinicasService: FichaClinicaService,
    private userService: LoginService) { }

  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
    this.matTableDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      toDate: [],
      fromDate: [],
      empleado: [],
      cliente: [],
      categoria: [],
      subcategoria: [],
    });

    this.fichasClinicas$ = this.fichaClinicasService.getFichasClinicas();
    console.log("Fichas:", this.fichasClinicas$.subscribe(console.log));
    this.usuarios$ = this.userService.getPersonas();
    this.categorias$ = this.categoriaService.getCategorias();
    this.subCategorias$ = this.categoriaService.getSubCategorias();

    this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
      console.log(idCategoria);
      this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(idCategoria);
    });
    this.fichasClinicas$.subscribe((data: any) => {
      this.matTableDataSource.data = data;
    });


  }

  getPersonas() {
    this.userService
      .getPersonas()
      .subscribe((data: any) => {
        console.log(data);
      },);
  }

  getFichaClinicas() {
    this.fichasClinicas$ = this.fichaClinicasService.getFichasClinicas();
  }

  dateToString(date: Date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = (date.getDate() + 1).toString();
    if (Number.parseInt(month) > 9) {
      month = "0" + month;
    }

    if (Number.parseInt(day) > 9) {
      day = "0" + day;
    }

    return `${year}${month}${day}`;
  }

  reset() {
    this.myForm.reset();
  }

  openDialog(isEdit: boolean, ficha_clinica?: any): void {
    if (!isEdit) {
      const dialogRef = this.dialog.open(AddDialogComponent, {
        width: '100%',
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result != null) {
          this.fichaClinicasService.addFichaClinica(result).subscribe((data: any) => {
            console.log(data);
          });
        }
      });
    } else {
      const dialogRef = this.dialog.open(EditDialogComponent, {
        width: '100%',
        data: ficha_clinica
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result != null) {
          this.fichaClinicasService.addFichaClinica(result).subscribe((data: any) => {
            console.log(data);
          });
        }
      });

    }

  }

  deleteElement(element: any) {
  }


  applyFilter() {
    const formValue = this.myForm.value;
    console.log("b4");
    console.log(formValue);



    const { fromDate, toDate, empleado, cliente, categoria, subcategoria } = formValue;

    let filtro: any = {};
    if (fromDate) {
      const fechaDesde = new Date(formValue.fromDate);
      const fechaDesdeCadena = `${fechaDesde.getFullYear()}${(fechaDesde.getMonth() + 1) <= 9 ? `0${(fechaDesde.getMonth() + 1)}` : (fechaDesde.getMonth() + 1)}${(fechaDesde.getDate() + 1) <= 9 ? `0${(fechaDesde.getDate() + 1)}` : (fechaDesde.getDate() + 1)}`;
      filtro.fechaDesdeCadena = fechaDesdeCadena;
    }

    if (toDate) {
      const fechaHasta = new Date(formValue.toDate);
      const fechaHastaCadena = `${fechaHasta.getFullYear()}${(fechaHasta.getMonth() + 1) <= 9 ? `0${(fechaHasta.getMonth() + 1)}` : (fechaHasta.getMonth() + 1)}${(fechaHasta.getDate() + 1) <= 9 ? `0${(fechaHasta.getDate() + 1)}` : (fechaHasta.getDate() + 1)}`;
      filtro.fechaHastaCadena = fechaHastaCadena;
    }

    if (empleado) {
      filtro['idEmpleado'] = { idEmpleado: empleado };
    }

    if (cliente) {
      filtro['idCliente'] = { idCliente: cliente };
    }

    if (subcategoria) {
      filtro['idTipoProducto'] = { idTipoProducto: subcategoria };
    }

    console.log(filtro);

    //Check if filter has at least one key

    this.fichaClinicasService.getFichasClinicas().subscribe((data: any) => {
      console.log(data);
      if (Object.keys(filtro).length > 0) {
        let filteredData = data.filter((fichaClinica: any) => {
          let isValid = true;
          if (filtro.fechaDesdeCadena) {
            isValid = isValid && fichaClinica.fechaDesdeCadena >= filtro.fechaDesdeCadena;
          }
          if (filtro.fechaHastaCadena) {
            isValid = isValid && fichaClinica.fechaHastaCadena <= filtro.fechaHastaCadena;
          }
          if (filtro.idEmpleado) {
            isValid = isValid && fichaClinica.idEmpleado.idEmpleado === filtro.idEmpleado.idEmpleado;
          }
          if (filtro.idCliente) {
            isValid = isValid && fichaClinica.idCliente.idCliente === filtro.idCliente.idCliente;
          }
          if (filtro.idTipoProducto) {
            console.log("entre");
            console.log(fichaClinica.idTipoProducto.idTipoProducto);
            console.log(filtro.idTipoProducto.idTipoProducto);
            isValid = isValid && fichaClinica.idTipoProducto.idTipoProducto === filtro.idTipoProducto.idTipoProducto;
          }
          console.log("isValid");
          console.log(isValid);
          return isValid;
        });
        console.log(filteredData);
        this.matTableDataSource.data = filteredData;
      }

    });



    //?ejemplo={"fechaDesdeCadena":"20190901","fechaHastaCadena":"20190901","idEmpleado":{idPersona:7},"idCliente":{idPersona:7},"idTipoProducto":{idTipoProducto:1},"idSubCategoria":1}
  }
}
