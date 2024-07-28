import { TestBed } from '@angular/core/testing';

import { LabratService } from './labrat.service';

describe('LabratService', () => {
  let service: LabratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
