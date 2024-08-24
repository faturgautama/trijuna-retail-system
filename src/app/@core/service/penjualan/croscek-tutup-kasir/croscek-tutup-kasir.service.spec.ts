import { TestBed } from '@angular/core/testing';

import { CroscekTutupKasirService } from './croscek-tutup-kasir.service';

describe('CroscekTutupKasirService', () => {
  let service: CroscekTutupKasirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CroscekTutupKasirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
