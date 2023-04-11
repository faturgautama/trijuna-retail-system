import { TestBed } from '@angular/core/testing';

import { SetupDivisiService } from './setup-divisi.service';

describe('SetupDivisiService', () => {
  let service: SetupDivisiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupDivisiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
