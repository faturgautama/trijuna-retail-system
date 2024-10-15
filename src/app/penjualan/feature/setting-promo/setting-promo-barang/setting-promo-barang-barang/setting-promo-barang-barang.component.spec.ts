import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoBarangBarangComponent } from './setting-promo-barang-barang.component';

describe('SettingPromoBarangBarangComponent', () => {
  let component: SettingPromoBarangBarangComponent;
  let fixture: ComponentFixture<SettingPromoBarangBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoBarangBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoBarangBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
