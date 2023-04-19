import { TestBed } from '@angular/core/testing';

import { PembelianDenganPoService } from './pembelian-dengan-po.service';

describe('PembelianDenganPoService', () => {
  let service: PembelianDenganPoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PembelianDenganPoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
