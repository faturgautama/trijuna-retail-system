import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPembelianRokokComponent } from './laporan-pembelian-rokok.component';

describe('LaporanPembelianRokokComponent', () => {
  let component: LaporanPembelianRokokComponent;
  let fixture: ComponentFixture<LaporanPembelianRokokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPembelianRokokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPembelianRokokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
