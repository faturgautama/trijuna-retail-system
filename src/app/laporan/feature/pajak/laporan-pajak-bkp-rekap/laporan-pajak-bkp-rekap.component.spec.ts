import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPajakBkpRekapComponent } from './laporan-pajak-bkp-rekap.component';

describe('LaporanPajakBkpRekapComponent', () => {
  let component: LaporanPajakBkpRekapComponent;
  let fixture: ComponentFixture<LaporanPajakBkpRekapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPajakBkpRekapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPajakBkpRekapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
