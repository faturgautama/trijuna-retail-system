import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoDiskonSupplierComponent } from './setting-promo-diskon-supplier.component';

describe('SettingPromoDiskonSupplierComponent', () => {
  let component: SettingPromoDiskonSupplierComponent;
  let fixture: ComponentFixture<SettingPromoDiskonSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoDiskonSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoDiskonSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
