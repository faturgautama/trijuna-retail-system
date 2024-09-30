import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPajakNonBkpComponent } from './laporan-pajak-non-bkp.component';

describe('LaporanPajakNonBkpComponent', () => {
  let component: LaporanPajakNonBkpComponent;
  let fixture: ComponentFixture<LaporanPajakNonBkpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPajakNonBkpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPajakNonBkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
