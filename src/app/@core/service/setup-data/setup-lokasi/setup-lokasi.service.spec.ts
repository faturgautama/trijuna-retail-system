import { TestBed } from '@angular/core/testing';

import { SetupLokasiService } from './setup-lokasi.service';

describe('SetupLokasiService', () => {
  let service: SetupLokasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupLokasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
