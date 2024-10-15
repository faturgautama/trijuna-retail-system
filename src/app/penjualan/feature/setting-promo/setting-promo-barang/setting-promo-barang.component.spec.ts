import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoBarangComponent } from './setting-promo-barang.component';

describe('SettingPromoBarangComponent', () => {
  let component: SettingPromoBarangComponent;
  let fixture: ComponentFixture<SettingPromoBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
