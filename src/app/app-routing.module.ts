import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaisComponent} from "./pais/pais.component";
import {PaisAgregarComponent} from "./pais/pais-agregar/pais-agregar.component";


const routes: Routes = [
  {
    path:'pais',
    component:PaisComponent
  },
  {
    path:'nuevopais',
    component:PaisAgregarComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
