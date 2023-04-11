import { TestBed } from '@angular/core/testing';

import { SetupRakService } from './setup-rak.service';

describe('SetupRakService', () => {
  let service: SetupRakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupRakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
