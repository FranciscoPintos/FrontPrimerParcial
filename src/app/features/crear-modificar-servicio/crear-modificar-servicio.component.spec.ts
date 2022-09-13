import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarServicioComponent } from './crear-modificar-servicio.component';

describe('CrearModificarServicioComponent', () => {
  let component: CrearModificarServicioComponent;
  let fixture: ComponentFixture<CrearModificarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
