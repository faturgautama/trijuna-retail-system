import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoDiskonBarangComponent } from './setting-promo-diskon-barang.component';

describe('SettingPromoDiskonBarangComponent', () => {
  let component: SettingPromoDiskonBarangComponent;
  let fixture: ComponentFixture<SettingPromoDiskonBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoDiskonBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoDiskonBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
