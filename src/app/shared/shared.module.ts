import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
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

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonModule,
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule
];

const FORM_MODULES = [
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    AddDialogComponent,
    EditDialogComponent,
    CategoriaPageComponent
  ],
  imports: [
    CommonModule,
    ...FORM_MODULES,
    ...MATERIAL_MODULES,
    FlexLayoutModule
  ],
  exports: [
    ...FORM_MODULES,
    ...MATERIAL_MODULES,
    FlexLayoutModule
  ]
})
export class SharedModule { }
