import { TestBed } from '@angular/core/testing';

import { SettingPointMemberService } from './setting-point-member.service';

describe('SettingPointMemberService', () => {
  let service: SettingPointMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingPointMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
