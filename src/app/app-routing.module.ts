import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./shared/components/pais/pais.component";
import { PaisAgregarComponent } from "./shared/components/pais/pais-agregar/pais-agregar.component";
import { ListadoFichaClinicaPageComponent } from './features/ficha-clinica/pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { CategoriaPageComponent } from './shared/pages/categoria-page/categoria-page.component';
import { SubCategoriaPageComponent } from './shared/pages/sub-categoria-page/sub-categoria-page.component';
import { CrearModificarServicioComponent } from './features/crear-modificar-servicio/crear-modificar-servicio.component';
import {ListadoServicioComponent} from "./features/servicio/pages/listar-servicio/listado-servicio.component";
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
    path: 'servicios',
    component: ListadoServicioComponent
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
  {
    path: 'listar_servicio',
    component: ListadoServicioComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
