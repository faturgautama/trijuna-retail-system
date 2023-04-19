import { TestBed } from '@angular/core/testing';

import { PembelianTanpaPoService } from './pembelian-tanpa-po.service';

describe('PembelianTanpaPoService', () => {
  let service: PembelianTanpaPoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PembelianTanpaPoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
