import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ListadoFichaClinicaPageComponent} from "./listado-ficha-clinica-page.component";



describe('ListadoFichaClinicaPageComponent', () => {
  let component: ListadoFichaClinicaPageComponent;
  let fixture: ComponentFixture<ListadoFichaClinicaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoFichaClinicaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFichaClinicaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
