import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./components/pais/pais.component";
import { PaisAgregarComponent } from "./components/pais/pais-agregar/pais-agregar.component";
import { LoginComponent } from './auth/pages/login/login.component';
import {ReservasComponent} from "./reserva/pages/reservas/reservas.component";


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
    path:'reserva',
    component: ReservasComponent
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
