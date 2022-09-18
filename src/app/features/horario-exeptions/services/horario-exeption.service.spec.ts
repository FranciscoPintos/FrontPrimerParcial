import { TestBed } from '@angular/core/testing';

import { HorarioExeptionService } from './horario-exeption.service';

describe('HorarioExeptionService', () => {
  let service: HorarioExeptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioExeptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
