import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaisComponent} from "./components/pais/pais.component";
import {PaisAgregarComponent} from "./components/pais/pais-agregar/pais-agregar.component";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  {
    path:'pais',
    component:PaisComponent
  },
  {
    path:'nuevopais',
    component:PaisAgregarComponent
  },
  {
    path:'login',
    component:LoginComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
