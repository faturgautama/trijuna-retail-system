import { TestBed } from '@angular/core/testing';

import { SetupMemberService } from './setup-member.service';

describe('SetupMemberService', () => {
  let service: SetupMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
