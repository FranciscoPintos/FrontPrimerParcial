import { TestBed } from '@angular/core/testing';

import { CrearModificarServicioService } from './crear-modificar-servicio.service';

describe('CrearModificarServicioService', () => {
  let service: CrearModificarServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearModificarServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
