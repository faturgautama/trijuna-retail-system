import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetakLabelHargaBarangComponent } from './cetak-label-harga-barang.component';

describe('CetakLabelHargaBarangComponent', () => {
  let component: CetakLabelHargaBarangComponent;
  let fixture: ComponentFixture<CetakLabelHargaBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetakLabelHargaBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetakLabelHargaBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
