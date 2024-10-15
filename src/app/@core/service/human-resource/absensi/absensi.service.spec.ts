import { TestBed } from '@angular/core/testing';

import { AbsensiService } from './absensi.service';

describe('AbsensiService', () => {
  let service: AbsensiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsensiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
