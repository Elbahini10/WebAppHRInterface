import { TestBed } from '@angular/core/testing';

import { RemboursementServicesService } from './remboursement-services.service';

describe('RemboursementServicesService', () => {
  let service: RemboursementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemboursementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
