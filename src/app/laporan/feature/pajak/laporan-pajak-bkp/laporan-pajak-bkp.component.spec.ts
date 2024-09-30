import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanPajakBkpComponent } from './laporan-pajak-bkp.component';

describe('LaporanPajakBkpComponent', () => {
  let component: LaporanPajakBkpComponent;
  let fixture: ComponentFixture<LaporanPajakBkpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanPajakBkpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanPajakBkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
