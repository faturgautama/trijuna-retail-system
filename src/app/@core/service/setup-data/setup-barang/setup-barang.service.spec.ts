import { TestBed } from '@angular/core/testing';

import { SetupBarangService } from './setup-barang.service';

describe('SetupBarangService', () => {
  let service: SetupBarangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupBarangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
