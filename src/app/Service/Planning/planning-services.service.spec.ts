import { TestBed } from '@angular/core/testing';

import { PlanningServicesService } from './planning-services.service';

describe('PlanningServicesService', () => {
  let service: PlanningServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanningServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
