import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoServicioComponent } from './listado-servicio.component';

describe('ListadoServicioComponent', () => {
  let component: ListadoServicioComponent;
  let fixture: ComponentFixture<ListadoServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
