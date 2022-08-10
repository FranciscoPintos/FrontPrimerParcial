import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaisComponent } from './pais/pais.component';
import {HttpClientModule} from "@angular/common/http";
import {ServicepaisService} from "./service/servicepais.service";

@NgModule({
  declarations: [
    AppComponent,
    PaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ServicepaisService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
