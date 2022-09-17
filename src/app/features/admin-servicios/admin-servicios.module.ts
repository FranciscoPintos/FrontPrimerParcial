import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './pages/productos/productos.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminServiciosModule { }
