import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoFichaClinicaPageComponent } from './pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ListadoFichaClinicaPageComponent
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
export class FichaClinicaModule { }
