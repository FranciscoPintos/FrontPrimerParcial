import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorarioExeptionComponent } from './page/horario-exeption/horario-exeption.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    HorarioExeptionComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FlexModule,

  ]
})
export class HorarioExeptionsModule { }
