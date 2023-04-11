import { TestBed } from '@angular/core/testing';

import { SetupSatuanService } from './setup-satuan.service';

describe('SetupSatuanService', () => {
  let service: SetupSatuanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupSatuanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
