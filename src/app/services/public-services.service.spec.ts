import { TestBed } from '@angular/core/testing';

import { PublicServicesService } from './public-services.service';

describe('PublicServicesService', () => {
  let service: PublicServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
