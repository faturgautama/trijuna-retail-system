import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanStokPerTanggalComponent } from './laporan-stok-per-tanggal.component';

describe('LaporanStokPerTanggalComponent', () => {
  let component: LaporanStokPerTanggalComponent;
  let fixture: ComponentFixture<LaporanStokPerTanggalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanStokPerTanggalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanStokPerTanggalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
