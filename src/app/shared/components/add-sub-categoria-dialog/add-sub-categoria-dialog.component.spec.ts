import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubCategoriaDialogComponent } from './add-sub-categoria-dialog.component';

describe('AddSubCategoriaDialogComponent', () => {
  let component: AddSubCategoriaDialogComponent;
  let fixture: ComponentFixture<AddSubCategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubCategoriaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
