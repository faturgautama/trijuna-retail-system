import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanOmsetBreakdownMonthlyComponent } from './laporan-omset-breakdown-monthly.component';

describe('LaporanOmsetBreakdownMonthlyComponent', () => {
  let component: LaporanOmsetBreakdownMonthlyComponent;
  let fixture: ComponentFixture<LaporanOmsetBreakdownMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanOmsetBreakdownMonthlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanOmsetBreakdownMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
