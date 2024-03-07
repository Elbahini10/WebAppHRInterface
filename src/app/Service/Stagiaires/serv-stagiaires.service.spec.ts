import { TestBed } from '@angular/core/testing';

import { ServStagiairesService } from './serv-stagiaires.service';

describe('ServStagiairesService', () => {
  let service: ServStagiairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServStagiairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
