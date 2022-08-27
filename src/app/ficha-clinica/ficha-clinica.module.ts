import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoFichaClinicaPageComponent } from './pages/listado-ficha-clinica-page/listado-ficha-clinica-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListadoFichaClinicaPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    MatDatepickerModule
  ]
})
export class FichaClinicaModule { }
