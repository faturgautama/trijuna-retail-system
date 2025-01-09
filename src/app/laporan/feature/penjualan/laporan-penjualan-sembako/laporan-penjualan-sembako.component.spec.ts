import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPenjualanSembakoComponent } from './laporan-penjualan-sembako.component';

describe('LaporanPenjualanSembakoComponent', () => {
  let component: LaporanPenjualanSembakoComponent;
  let fixture: ComponentFixture<LaporanPenjualanSembakoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPenjualanSembakoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPenjualanSembakoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
