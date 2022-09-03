import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./shared/components/pais/pais.component";
import { PaisAgregarComponent } from "./shared/components/pais/pais-agregar/pais-agregar.component";

import { ListadoFichaClinicaPageComponent } from './features/ficha-clinica/pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { CategoriaPageComponent } from './shared/pages/categoria-page/categoria-page.component';


const routes: Routes = [
  {
    path: 'pais',
    component: PaisComponent
  },
  {
    path: 'nuevopais',
    component: PaisAgregarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ficha_clinica',
    component: ListadoFichaClinicaPageComponent
  },
  {
    path: 'categorias',
    component: CategoriaPageComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
