import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/features/auth/interfaces/usuario';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-modificar-servicio',
  templateUrl: './crear-modificar-servicio.component.html',
  styleUrls: ['./crear-modificar-servicio.component.css']
})
export class CrearModificarServicioComponent implements OnInit {
	myForm!: FormGroup;
	usuarios$!: Observable<Usuario[]>;
  constructor() { }

  ngOnInit(): void {
  }

}
