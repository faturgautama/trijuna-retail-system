import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPenjualanGrosirComponent } from './laporan-penjualan-grosir.component';

describe('LaporanPenjualanGrosirComponent', () => {
  let component: LaporanPenjualanGrosirComponent;
  let fixture: ComponentFixture<LaporanPenjualanGrosirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPenjualanGrosirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPenjualanGrosirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
