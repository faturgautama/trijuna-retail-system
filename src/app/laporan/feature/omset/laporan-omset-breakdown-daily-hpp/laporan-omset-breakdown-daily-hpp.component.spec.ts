import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaporanOmsetBreakdownDailyHppComponent } from './laporan-omset-breakdown-daily-hpp.component';

describe('LaporanOmsetBreakdownDailyHppComponent', () => {
  let component: LaporanOmsetBreakdownDailyHppComponent;
  let fixture: ComponentFixture<LaporanOmsetBreakdownDailyHppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaporanOmsetBreakdownDailyHppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaporanOmsetBreakdownDailyHppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
