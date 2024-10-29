import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPointMemberComponent } from './setting-point-member.component';

describe('SettingPointMemberComponent', () => {
  let component: SettingPointMemberComponent;
  let fixture: ComponentFixture<SettingPointMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPointMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPointMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
