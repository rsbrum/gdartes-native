import { TestBed } from '@angular/core/testing';

import { ContainerFitService } from './container-fit.service';

describe('ContainerFitService', () => {
  let service: ContainerFitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContainerFitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
