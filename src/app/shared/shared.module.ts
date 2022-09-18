import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { CategoriaPageComponent } from './pages/categoria-page/categoria-page.component';
import { SubCategoriaPageComponent } from './pages/sub-categoria-page/sub-categoria-page.component';
import { AddReservaComponent } from './components/add-reserva/add-reserva.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BasicDialogComponent } from './components/basic-dialog/basic-dialog.component';
import { AddCategoriaDialogComponent } from './components/add-categoria-dialog/add-categoria-dialog.component';
import { AddSubCategoriaDialogComponent } from './components/add-sub-categoria-dialog/add-sub-categoria-dialog.component';
import { EditSubCategoriaDialogComponent } from './components/edit-sub-categoria-dialog/edit-sub-categoria-dialog.component';
import { EditCategoriaDialogComponent } from './components/edit-categoria-dialog/edit-categoria-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
import { EditReservaComponent } from './components/edit-reserva/edit-reserva.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductoDialogComponent } from './components/producto-dialog/producto-dialog.component';
import { PacienteDialogComponent } from './components/paciente-dialog/paciente-dialog.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatButtonModule,
  MatNativeDateModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSliderModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTableModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatOptionModule,
  MatCheckboxModule,
  MatListModule,
  MatIconModule,
  MatRadioModule
];

const FORM_MODULES = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [
    AddDialogComponent,
    EditDialogComponent,
    CategoriaPageComponent,
    SubCategoriaPageComponent,
    AddReservaComponent,
    BasicDialogComponent,
    AddCategoriaDialogComponent,
    AddSubCategoriaDialogComponent,
    EditSubCategoriaDialogComponent,
    EditCategoriaDialogComponent,
    EditReservaComponent,
    EditCategoriaDialogComponent,
    SideBarComponent,
    HomeComponent,
    ProductoDialogComponent,
    PacienteDialogComponent,
  ],
  imports: [
    CommonModule,
    ...FORM_MODULES,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    RouterModule,
    ScrollingModule,
    MatRadioModule,
  ],
  exports: [
    ...FORM_MODULES,
    ...MATERIAL_MODULES,
    FlexLayoutModule,
    SideBarComponent,
  ],
})
export class SharedModule {}
