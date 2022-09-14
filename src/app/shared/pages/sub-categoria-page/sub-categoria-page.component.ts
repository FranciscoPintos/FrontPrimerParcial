import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SubCategoria } from 'src/app/features/ficha-clinica/interfaces/subcategoria.interface';
import { FichaClinicaService } from 'src/app/features/ficha-clinica/services/ficha-clinica.service';
import { AddDialogComponent } from '../../components/add-dialog/add-dialog.component';
import { AddSubCategoriaDialogComponent } from '../../components/add-sub-categoria-dialog/add-sub-categoria-dialog.component';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { EditSubCategoriaDialogComponent } from '../../components/edit-sub-categoria-dialog/edit-sub-categoria-dialog.component';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-sub-categoria-page',
  templateUrl: './sub-categoria-page.component.html',
  styleUrls: ['./sub-categoria-page.component.css']
})
export class SubCategoriaPageComponent implements OnInit {

  matTableDataSource = new MatTableDataSource<SubCategoria>();
  subCategorias$!: Observable<SubCategoria[]>;
  displayedColumns: string[] = ['idSubCategoria', 'descripcion', 'acciones'];

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
    this.subCategorias$ = this.categoriaService.getSubCategorias();
    this.subCategorias$.subscribe((data: any) => {
      this.matTableDataSource.data = data;
    }
    );
  }


  openDialog(isEdit: boolean, ficha_clinica?: any): void {
    if (!isEdit) {
      const dialogRef = this.dialog.open(AddSubCategoriaDialogComponent, {
        width: '100%',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
        if (result != null) {

        }
      });
    } else {
      const dialogRef = this.dialog.open(EditSubCategoriaDialogComponent, {
        width: '100%',
        data: ficha_clinica
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
        if (result != null) {

        }
      });

    }

  }

  deleteElement(element: any) {
  }

}
