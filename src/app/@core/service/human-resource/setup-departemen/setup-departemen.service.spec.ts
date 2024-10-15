import { TestBed } from '@angular/core/testing';

import { SetupDepartemenService } from './setup-departemen.service';

describe('SetupDepartemenService', () => {
  let service: SetupDepartemenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupDepartemenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
