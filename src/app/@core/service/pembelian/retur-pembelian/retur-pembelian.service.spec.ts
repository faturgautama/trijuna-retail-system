import { TestBed } from '@angular/core/testing';

import { ReturPembelianService } from './retur-pembelian.service';

describe('ReturPembelianService', () => {
  let service: ReturPembelianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturPembelianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
