import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './components/pais/pais.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServicepaisService } from "./service/servicepais.service";
import { PaisAgregarComponent } from './components/pais/pais-agregar/pais-agregar.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from "@angular/material/slider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { AuthModule } from './auth/auth.module';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { CrearModificarServicioComponent } from './crear-modificar-servicio/crear-modificar-servicio.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisAgregarComponent,
    LoginComponent,
    CrearModificarServicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
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
    FlexLayoutModule,
  ],
  providers: [ServicepaisService, { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
