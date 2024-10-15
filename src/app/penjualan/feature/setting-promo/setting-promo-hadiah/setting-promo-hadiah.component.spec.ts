import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoHadiahComponent } from './setting-promo-hadiah.component';

describe('SettingPromoHadiahComponent', () => {
  let component: SettingPromoHadiahComponent;
  let fixture: ComponentFixture<SettingPromoHadiahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoHadiahComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoHadiahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
