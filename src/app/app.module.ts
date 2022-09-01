import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './shared/components/pais/pais.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServicepaisService } from "./service/servicepais.service";
import { PaisAgregarComponent } from './shared/components/pais/pais-agregar/pais-agregar.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthModule } from './auth/auth.module';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { FichaClinicaModule } from './ficha-clinica/ficha-clinica.module';
import { FiltroComponent } from './shared/components/filtro/filtro.component';

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisAgregarComponent,
    LoginComponent,
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    //Modulos Propios
    AuthModule,
    FichaClinicaModule

  ],
  providers: [ServicepaisService, { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
