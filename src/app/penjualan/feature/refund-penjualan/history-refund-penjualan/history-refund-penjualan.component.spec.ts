import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRefundPenjualanComponent } from './history-refund-penjualan.component';

describe('HistoryRefundPenjualanComponent', () => {
  let component: HistoryRefundPenjualanComponent;
  let fixture: ComponentFixture<HistoryRefundPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryRefundPenjualanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRefundPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
