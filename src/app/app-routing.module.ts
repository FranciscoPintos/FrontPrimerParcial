import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./shared/components/pais/pais.component";
import { PaisAgregarComponent } from "./shared/components/pais/pais-agregar/pais-agregar.component";
import { ListadoFichaClinicaPageComponent } from './features/ficha-clinica/pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { CategoriaPageComponent } from './shared/pages/categoria-page/categoria-page.component';
import { SubCategoriaPageComponent } from './shared/pages/sub-categoria-page/sub-categoria-page.component';
import { CrearModificarServicioComponent } from './crear-modificar-servicio/crear-modificar-servicio.component';
import {ReservasComponent} from "./features/reserva/pages/reservas/reservas.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
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
  },

  {
    path: 'ficha_clinica',
    component: ListadoFichaClinicaPageComponent
  },
  {
    path: 'categorias',
    component: CategoriaPageComponent
  },
  {
    path: 'subcategorias',
    component: SubCategoriaPageComponent
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
