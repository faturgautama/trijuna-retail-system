import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanOmsetBreakdownMonthlyHppProfitComponent } from './laporan-omset-breakdown-monthly-hpp-profit.component';

describe('LaporanOmsetBreakdownMonthlyHppProfitComponent', () => {
  let component: LaporanOmsetBreakdownMonthlyHppProfitComponent;
  let fixture: ComponentFixture<LaporanOmsetBreakdownMonthlyHppProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanOmsetBreakdownMonthlyHppProfitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanOmsetBreakdownMonthlyHppProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
