import { TestBed } from '@angular/core/testing';

import { SetupKaryawanService } from './setup-karyawan.service';

describe('SetupKaryawanService', () => {
  let service: SetupKaryawanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupKaryawanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
