import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./shared/components/pais/pais.component";
import { PaisAgregarComponent } from "./shared/components/pais/pais-agregar/pais-agregar.component";
import { LoginComponent } from "./shared/components/login/login.component";
import { ListadoFichaClinicaPageComponent } from './ficha-clinica/pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';


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
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
