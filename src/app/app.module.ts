import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './shared/components/pais/pais.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServicepaisService } from "./shared/services/servicepais.service";
import { PaisAgregarComponent } from './shared/components/pais/pais-agregar/pais-agregar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared/components/login/login.component';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisAgregarComponent,
    LoginComponent,
    FiltroComponent,
    CrearModificarServicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    //Modulos Propios
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    AuthModule,
    FichaClinicaModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
	ReactiveFormsModule,
	MatSelectModule


  ],
  providers: [ServicepaisService, { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
