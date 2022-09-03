import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { FichaClinicaService } from 'src/app/features/ficha-clinica/services/ficha-clinica.service';
import { AddDialogComponent } from '../../components/add-dialog/add-dialog.component';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-page',
  templateUrl: './categoria-page.component.html',
  styleUrls: ['./categoria-page.component.css']
})
export class CategoriaPageComponent implements OnInit {
  matTableDataSource = new MatTableDataSource<Categoria>();
  categorias$!: Observable<Categoria[]>;
  displayedColumns: string[] = ['idCategoria', 'descripcion', 'acciones'];

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
    this.categorias$ = this.categoriaService.getCategorias();
    this.categorias$.subscribe((data: any) => {
      this.matTableDataSource.data = data;
    }
    );
  }


  openDialog(isEdit: boolean, ficha_clinica?: any): void {
    if (!isEdit) {
      const dialogRef = this.dialog.open(AddDialogComponent, {
        width: '100%',
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        console.log('The dialog was closed');
        if (result != null) {

        }
      });
    } else {
      const dialogRef = this.dialog.open(EditDialogComponent, {
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
