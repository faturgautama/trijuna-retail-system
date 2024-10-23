import { TestBed } from '@angular/core/testing';

import { RepackingService } from './repacking.service';

describe('RepackingService', () => {
  let service: RepackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
