import { TestBed } from '@angular/core/testing';

import { SetupMerkService } from './setup-merk.service';

describe('SetupMerkService', () => {
  let service: SetupMerkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupMerkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
