import { TestBed } from '@angular/core/testing';

import { PenerimaanKonsinyasiService } from './penerimaan-konsinyasi.service';

describe('PenerimaanKonsinyasiService', () => {
  let service: PenerimaanKonsinyasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenerimaanKonsinyasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
