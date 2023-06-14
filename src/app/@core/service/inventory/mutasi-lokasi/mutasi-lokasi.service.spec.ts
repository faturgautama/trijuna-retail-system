import { TestBed } from '@angular/core/testing';

import { MutasiLokasiService } from './mutasi-lokasi.service';

describe('MutasiLokasiService', () => {
  let service: MutasiLokasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutasiLokasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
