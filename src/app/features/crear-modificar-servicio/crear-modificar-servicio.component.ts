import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { FichaClinica } from '../ficha-clinica/interfaces/ficha_clinica.inteface';

@Component({
  selector: 'app-crear-modificar-servicio',
  templateUrl: './crear-modificar-servicio.component.html',
  styleUrls: ['./crear-modificar-servicio.component.css']
})
export class CrearModificarServicioComponent implements OnInit {
	myForm!: FormGroup;
	usuarios$!: Observable<Usuario[]>;
	displayedColumns: string[] = ['fecha', 'profesional', 'cliente', 'categoria', 'subcategoria', 'acciones'];
	matTableDataSource = new MatTableDataSource<FichaClinica>();
  constructor() { }

  ngOnInit(): void {
  }

}
