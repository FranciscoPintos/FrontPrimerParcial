import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubCategoriaDialogComponent } from './edit-sub-categoria-dialog.component';

describe('EditSubCategoriaDialogComponent', () => {
  let component: EditSubCategoriaDialogComponent;
  let fixture: ComponentFixture<EditSubCategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubCategoriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
