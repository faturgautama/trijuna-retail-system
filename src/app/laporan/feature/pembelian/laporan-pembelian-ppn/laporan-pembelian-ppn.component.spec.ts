import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPembelianPpnComponent } from './laporan-pembelian-ppn.component';

describe('LaporanPembelianPpnComponent', () => {
  let component: LaporanPembelianPpnComponent;
  let fixture: ComponentFixture<LaporanPembelianPpnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPembelianPpnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPembelianPpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
