import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoHadiahBarangComponent } from './setting-promo-hadiah-barang.component';

describe('SettingPromoHadiahBarangComponent', () => {
  let component: SettingPromoHadiahBarangComponent;
  let fixture: ComponentFixture<SettingPromoHadiahBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoHadiahBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoHadiahBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
