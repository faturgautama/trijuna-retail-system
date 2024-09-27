import { TestBed } from '@angular/core/testing';

import { FakturPajakPembelianService } from './faktur-pajak-pembelian.service';

describe('FakturPajakPembelianService', () => {
  let service: FakturPajakPembelianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakturPajakPembelianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
