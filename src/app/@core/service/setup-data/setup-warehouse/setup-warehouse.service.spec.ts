import { TestBed } from '@angular/core/testing';

import { SetupWarehouseService } from './setup-warehouse.service';

describe('SetupWarehouseService', () => {
  let service: SetupWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
