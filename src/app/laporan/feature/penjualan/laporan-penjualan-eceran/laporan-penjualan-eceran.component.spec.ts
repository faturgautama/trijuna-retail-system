import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPenjualanEceranComponent } from './laporan-penjualan-eceran.component';

describe('LaporanPenjualanEceranComponent', () => {
  let component: LaporanPenjualanEceranComponent;
  let fixture: ComponentFixture<LaporanPenjualanEceranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPenjualanEceranComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPenjualanEceranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
