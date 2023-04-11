import { TestBed } from '@angular/core/testing';

import { SetupGroupService } from './setup-group.service';

describe('SetupGroupService', () => {
  let service: SetupGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
