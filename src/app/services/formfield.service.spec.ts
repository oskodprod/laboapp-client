import { TestBed } from '@angular/core/testing';

import { FormfieldService } from './formfield.service';

describe('FormfieldService', () => {
  let service: FormfieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormfieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
