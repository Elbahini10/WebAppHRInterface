import { TestBed } from '@angular/core/testing';

import { EmployeurServiceService } from './employeur-service.service';

describe('EmployeurServiceService', () => {
  let service: EmployeurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
