import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoHadiahSupplierComponent } from './setting-promo-hadiah-supplier.component';

describe('SettingPromoHadiahSupplierComponent', () => {
  let component: SettingPromoHadiahSupplierComponent;
  let fixture: ComponentFixture<SettingPromoHadiahSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoHadiahSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoHadiahSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
