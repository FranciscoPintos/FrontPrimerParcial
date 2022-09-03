import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./components/pais/pais.component";
import { PaisAgregarComponent } from "./components/pais/pais-agregar/pais-agregar.component";
import { LoginComponent } from './auth/pages/login/login.component';
import { CrearModificarServicioComponent } from './crear-modificar-servicio/crear-modificar-servicio.component';



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
    path: 'modservicio',
    component: CrearModificarServicioComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
