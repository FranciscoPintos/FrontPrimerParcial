import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './shared/components/pais/pais.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServicepaisService } from "./shared/services/servicepais.service";
import { PaisAgregarComponent } from './shared/components/pais/pais-agregar/pais-agregar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './features/auth/auth.module';
import { BaseUrlInterceptor } from './shared/interceptors/base-url.interceptor';
import { FichaClinicaModule } from './features/ficha-clinica/ficha-clinica.module';
import { FiltroComponent } from './shared/components/filtro/filtro.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from "@angular/material/slider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { CrearModificarServicioComponent } from './features/crear-modificar-servicio/crear-modificar-servicio.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServicioModule } from "./features/servicio/servicio.module";
import { ReservaModule } from "./features/reserva/reserva.module";
import { AddReservaComponent } from './shared/components/add-reserva/add-reserva.component';
import { MatOptionModule } from "@angular/material/core";
import { MatDatepicker, MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedModule } from './shared/shared.module';
import { HeaderRequestInterceptor } from './shared/interceptors/header-request.interceptor';
import { AdminServiciosModule } from './features/admin-servicios/admin-servicios.module';
import { PacientesModule } from './features/pacientes/pacientes.module';
import {HorarioExeptionsModule} from "./features/horario-exeptions/horario-exeptions.module";

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisAgregarComponent,
    FiltroComponent,
    CrearModificarServicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,

    //Modulos Propios
    AuthModule,
    ReservaModule,
    FichaClinicaModule,
    ServicioModule,
    AdminServiciosModule,
    PacientesModule,
    SharedModule,
    HorarioExeptionsModule


  ],
  providers: [ServicepaisService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderRequestInterceptor, multi: true },
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
