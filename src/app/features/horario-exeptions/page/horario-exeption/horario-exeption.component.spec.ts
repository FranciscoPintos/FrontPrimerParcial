import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioExeptionComponent } from './horario-exeption.component';

describe('HorarioExeptionComponent', () => {
  let component: HorarioExeptionComponent;
  let fixture: ComponentFixture<HorarioExeptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioExeptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioExeptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
