import { TestBed } from '@angular/core/testing';

import { SetupSupplierService } from './setup-supplier.service';

describe('SetupSupplierService', () => {
  let service: SetupSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
