import { TestBed } from '@angular/core/testing';

import { MutasiWarehouseService } from './mutasi-warehouse.service';

describe('MutasiWarehouseService', () => {
  let service: MutasiWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MutasiWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
