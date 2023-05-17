import { TestBed } from '@angular/core/testing';

import { TipoServicosService } from './services/tipos-services.service';

describe('TiposServicesService', () => {
  let service: TipoServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
