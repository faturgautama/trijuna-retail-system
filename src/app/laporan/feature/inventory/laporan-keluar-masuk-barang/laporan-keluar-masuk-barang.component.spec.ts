import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanKeluarMasukBarangComponent } from './laporan-keluar-masuk-barang.component';

describe('LaporanKeluarMasukBarangComponent', () => {
  let component: LaporanKeluarMasukBarangComponent;
  let fixture: ComponentFixture<LaporanKeluarMasukBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanKeluarMasukBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanKeluarMasukBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
