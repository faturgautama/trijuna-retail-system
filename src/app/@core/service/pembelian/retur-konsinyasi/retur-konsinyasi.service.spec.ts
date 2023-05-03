import { TestBed } from '@angular/core/testing';

import { ReturKonsinyasiService } from './retur-konsinyasi.service';

describe('ReturKonsinyasiService', () => {
  let service: ReturKonsinyasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturKonsinyasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
