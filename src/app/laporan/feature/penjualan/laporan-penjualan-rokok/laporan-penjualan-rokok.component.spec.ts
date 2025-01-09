import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPenjualanRokokComponent } from './laporan-penjualan-rokok.component';

describe('LaporanPenjualanRokokComponent', () => {
  let component: LaporanPenjualanRokokComponent;
  let fixture: ComponentFixture<LaporanPenjualanRokokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPenjualanRokokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPenjualanRokokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
