import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesPageComponent } from './pages/pacientes-page/pacientes-page.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PacientesPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PacientesModule { }
