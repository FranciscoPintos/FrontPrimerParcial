import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './pais/pais.component';
import {HttpClientModule} from "@angular/common/http";
import {ServicepaisService} from "./service/servicepais.service";
import { PaisAgregarComponent } from './pais/pais-agregar/pais-agregar.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent,
    PaisAgregarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ServicepaisService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
