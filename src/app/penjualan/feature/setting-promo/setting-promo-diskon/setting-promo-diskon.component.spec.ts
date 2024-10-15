import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoDiskonComponent } from './setting-promo-diskon.component';

describe('SettingPromoDiskonComponent', () => {
  let component: SettingPromoDiskonComponent;
  let fixture: ComponentFixture<SettingPromoDiskonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoDiskonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoDiskonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
