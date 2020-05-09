import { TestBed } from '@angular/core/testing';

import { PrivateServicesService } from './private-services.service';

describe('PrivateServicesService', () => {
  let service: PrivateServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
