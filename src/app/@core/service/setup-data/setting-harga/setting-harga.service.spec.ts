import { TestBed } from '@angular/core/testing';

import { SettingHargaService } from './setting-harga.service';

describe('SettingHargaService', () => {
  let service: SettingHargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingHargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
