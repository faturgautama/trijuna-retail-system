import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingVoucherComponent } from './setting-voucher.component';

describe('SettingVoucherComponent', () => {
  let component: SettingVoucherComponent;
  let fixture: ComponentFixture<SettingVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingVoucherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
