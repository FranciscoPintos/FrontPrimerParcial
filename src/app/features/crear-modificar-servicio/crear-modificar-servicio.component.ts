import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, zip } from 'rxjs';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { ServicioInterface } from '../servicio/interfaces/servicio.interface';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from '../ficha-clinica/interfaces/categoria.interface';
import { SubCategoria } from '../ficha-clinica/interfaces/subcategoria.interface';
import { CrearModificarServicioService } from './services/crear-modificar-servicio.service';
import { Detalle } from './interfaces/crear-modificar-servicio.interface';
import { FichaClinicaService } from '../ficha-clinica/services/ficha-clinica.service';
import { ServicioService } from '../servicio/services/servicio.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-crear-modificar-servicio',
	templateUrl: './crear-modificar-servicio.component.html',
	styleUrls: ['./crear-modificar-servicio.component.css']
})
export class CrearModificarServicioComponent implements OnInit {
	reseteando = false
	isEdit = this.data != null;
	myForm!: FormGroup;
	usuarios$!: Observable<Usuario[]>;
	categorias$!: Observable<Categoria[]>;
	subCategorias$!: Observable<SubCategoria[]>;
	detalles$!: Observable<Detalle[]>;
	displayedColumnsService: string[] = ['idficha', 'fechacategoria', 'subcategoria', 'acciones'];
	displayedColumnsDetalle: string[] = ['iddetalle', 'presentacion', 'preciounitario', 'cantidad', 'total', 'acciones'];
	matTableDataSource = new MatTableDataSource<ServicioInterface>();
	matTableDataSourceDetalle = new MatTableDataSource<Detalle>();
	selectedFicha = ""
	constructor(
		private usuariosService: LoginService,
		@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
		private dialogRef: MatDialogRef<CrearModificarServicioComponent>,
		private categoriaService: CategoriaService,
		private crearModificarServicioService: CrearModificarServicioService,
		private servicioService: ServicioService,
		private fichaService: FichaClinicaService
	) { }

	ngOnInit(): void {
		console.log("DATA:")
		console.log(this.data);
		const myDate = new Date(this.data?.fechaHora);

		console.log(this.data?.idFichaClinica.idTipoProducto.idCategoria.idCategoria);

		this.categorias$ = this.categoriaService.getCategorias();
		console.log(this.detalles$);
		let idCat = this.data?.idFichaClinica.idTipoProducto.idCategoria.idCategoria;

		if (this.isEdit) {
			this.crearModificarServicioService.getDetallesByIdServicio(this.data?.idServicio).subscribe((data)=>{
				this.matTableDataSourceDetalle.data = data;
			})
			this.matTableDataSource.data = [this.data?.idFichaClinica];
		}
		else
		{
			this.matTableDataSource.data = [];
		}
		

		this.myForm = this.fb.group({
			fecha: new FormControl({ value: myDate, disabled: this.data }),
			observacion: [this.data?.observacion],
			empleado: new FormControl({ value: this.data?.idEmpleado.idPersona, disabled: this.data }),
			cliente: new FormControl({ value: this.data?.idFichaClinica.idCliente.idPersona, disabled: this.data }),
			categoria: new FormControl({ value: Number(idCat), disabled: false }),
			subcategoria: new FormControl({ value: this.data?.idFichaClinica.idTipoProducto.idTipoProducto, disabled: false }),
		});

		this.subCategorias$ = this.categoriaService.getSubCategorias();
	
		this.myForm.get('categoria')!.valueChanges.subscribe(idCategoria => {
		  console.log(idCategoria);
		  this.subCategorias$ = this.categoriaService.getSubCategoriasByCategoriaId(idCategoria);
		});


		this.usuarios$ = this.usuariosService.getPersonas();

		 if (!this.isEdit) {
			this.myForm.valueChanges.pipe(map((data)=>{
				return {
					cliente: data?.cliente,
					empleado: data?.empleado
				}
			})).subscribe(data =>
				{
					
						
					let cliente = data?.cliente;
					let empleado = data?.empleado;
					if(this.reseteando)
					{
						console.log( cliente, empleado)
						this.matTableDataSource.data = [];
						if (!cliente && !empleado) {
							this.reseteando=false;
						}
						return;
					}
					let json = {};
					if (cliente) {
						json = {
							"idCliente":
								{"idPersona":cliente}
						}
					}
					if (empleado) {
						json = {
							...json,
							"idEmpleado":
							{"idPersona":empleado}
						}
					}
					this.fichaService.getFichasClinicas(json).subscribe(data => this.matTableDataSource.data = data);
				}
			)
		}
	}

	modificarServicio() {
		this.servicioService.addServicio({
			idFichaClinica: {
				idFichaClinica: this.selectedFicha},
			observacion: this.myForm.get('observacion')?.value
		}).subscribe(
			(data: any)=>
			{
				Swal.fire(
					'Éxito', `Se agregó el nuevo servicio n° ${data.idServicio}`, 'success'
				);

			},
			(error)=>
			{
				Swal.fire(
					'Error', error.error, 'error'
				);
				
			}
		)
		this.dialogRef.close();
	}

	onNoClick() {
		this.dialogRef.close();
	}

	reset() {
		this.reseteando = true
		this.myForm.controls['empleado']!.reset();
		this.myForm.controls['cliente']!.reset();
	  }

}
