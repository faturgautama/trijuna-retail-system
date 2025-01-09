import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanOmsetBreakdownDailyComponent } from './laporan-omset-breakdown-daily.component';

describe('LaporanOmsetBreakdownDailyComponent', () => {
  let component: LaporanOmsetBreakdownDailyComponent;
  let fixture: ComponentFixture<LaporanOmsetBreakdownDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanOmsetBreakdownDailyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanOmsetBreakdownDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
