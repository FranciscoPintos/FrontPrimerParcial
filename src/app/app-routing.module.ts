import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisComponent } from "./shared/components/pais/pais.component";
import { PaisAgregarComponent } from "./shared/components/pais/pais-agregar/pais-agregar.component";
import { ListadoFichaClinicaPageComponent } from './features/ficha-clinica/pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { CategoriaPageComponent } from './shared/pages/categoria-page/categoria-page.component';
import { SubCategoriaPageComponent } from './shared/pages/sub-categoria-page/sub-categoria-page.component';
import { CrearModificarServicioComponent } from './features/crear-modificar-servicio/crear-modificar-servicio.component';
import { ListadoServicioComponent } from "./features/servicio/pages/listar-servicio/listado-servicio.component";
import { ReservasComponent } from "./features/reserva/pages/reservas/reservas.component";
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './shared/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'pais',
    canActivate: [AuthGuard],
    component: PaisComponent
  },
  {
    path: 'nuevopais',
    canActivate: [AuthGuard],
    component: PaisAgregarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reserva',
    canActivate: [AuthGuard],
    component: ReservasComponent
  },

  {
    path: 'ficha_clinica',
    canActivate: [AuthGuard],
    component: ListadoFichaClinicaPageComponent
  },
  {
    path: 'servicios',
    canActivate: [AuthGuard],
    component: ListadoServicioComponent
  },
  {
    path: 'categorias',
    canActivate: [AuthGuard],
    component: CategoriaPageComponent
  },
  {
    path: 'subcategorias',
    canActivate: [AuthGuard],
    component: SubCategoriaPageComponent
  },
  {
    path: 'modservicio',
    canActivate: [AuthGuard],
    component: CrearModificarServicioComponent
  },
  {
    path: 'listar_servicio',
    canActivate: [AuthGuard],
    component: ListadoServicioComponent
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
