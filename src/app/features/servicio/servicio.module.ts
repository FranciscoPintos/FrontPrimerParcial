import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoServicioComponent } from './pages/listar-servicio/listado-servicio.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ListadoServicioComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    SharedModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class ServicioModule { }
