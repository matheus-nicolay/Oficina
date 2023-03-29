import { TestBed } from '@angular/core/testing';

import { TiposServicesService } from './tipos-services.service';

describe('TiposServicesService', () => {
  let service: TiposServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
