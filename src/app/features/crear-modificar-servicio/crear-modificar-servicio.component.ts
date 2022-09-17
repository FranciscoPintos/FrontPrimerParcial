import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioInterface } from '../servicio/interfaces/servicio.interface';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from '../ficha-clinica/interfaces/categoria.interface';
import { SubCategoria } from '../ficha-clinica/interfaces/subcategoria.interface';
import { CrearModificarServicioService } from './services/crear-modificar-servicio.service';
import { Detalle } from './interfaces/crear-modificar-servicio.interface';

@Component({
	selector: 'app-crear-modificar-servicio',
	templateUrl: './crear-modificar-servicio.component.html',
	styleUrls: ['./crear-modificar-servicio.component.css']
})
export class CrearModificarServicioComponent implements OnInit {
	myForm!: FormGroup;
	usuarios$!: Observable<Usuario[]>;
	categorias$!: Observable<Categoria[]>;
	subCategorias$!: Observable<SubCategoria[]>;
	detalles$!: Observable<Detalle[]>;
	displayedColumnsService: string[] = ['idficha', 'fechacategoria', 'subcategoria', 'acciones'];
	displayedColumnsDetalle: string[] = ['iddetalle', 'presentacion', 'preciounitario', 'cantidad', 'total', 'acciones'];
	matTableDataSource = new MatTableDataSource<ServicioInterface>();
	constructor(
		private usuariosService: LoginService,
		@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
		private dialogRef: MatDialogRef<CrearModificarServicioComponent>,
		private categoriaService: CategoriaService,
		private crearModificarServicioService: CrearModificarServicioService
	) { }

	ngOnInit(): void {
		console.log("DATA:")
		console.log(this.data);
		const myDate = new Date(this.data.fechaHora);


		console.log(this.data.idFichaClinica.idTipoProducto.idCategoria.idCategoria);

		this.categorias$ = this.categoriaService.getCategorias();
		this.detalles$ = this.crearModificarServicioService.getDetallesByIdServicio(this.data.idServicio);
		console.log(this.detalles$);
		let idCat = this.data.idFichaClinica.idTipoProducto.idCategoria.idCategoria;

		

		this.myForm = this.fb.group({
			fecha: new FormControl({ value: myDate, disabled: this.data }),
			observacion: [this.data.observacion],
			empleado: new FormControl({ value: this.data.idEmpleado.idPersona, disabled: this.data }),
			cliente: new FormControl({ value: this.data.idFichaClinica.idCliente.idPersona, disabled: this.data }),
			categoria: new FormControl({ value: Number(idCat), disabled: false }),
			subcategoria: new FormControl({ value: this.data.idFichaClinica.idTipoProducto.idTipoProducto, disabled: false }),
		});

		this.subCategorias$ = this.categoriaService.getSubCategorias();
	
		this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
		  console.log(idCategoria);
		  this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(idCategoria);
		});


		this.usuarios$ = this.usuariosService.getPersonas();

		this.matTableDataSource.data = [this.data.idFichaClinica];
	}

	modificarServicio() {
		this.dialogRef.close(this.myForm.value);
	}

	onNoClick() {
		this.dialogRef.close();
	}

}
