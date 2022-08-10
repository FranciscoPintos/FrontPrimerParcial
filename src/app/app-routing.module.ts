import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaisComponent} from "./pais/pais.component";

const routes: Routes = [
  {
    path:'pais',
    component:PaisComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
