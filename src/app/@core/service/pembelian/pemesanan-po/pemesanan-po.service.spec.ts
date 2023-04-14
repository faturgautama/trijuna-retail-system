import { TestBed } from '@angular/core/testing';

import { PemesananPoService } from './pemesanan-po.service';

describe('PemesananPoService', () => {
  let service: PemesananPoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PemesananPoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
