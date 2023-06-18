import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRefundPenjualanComponent } from './detail-refund-penjualan.component';

describe('DetailRefundPenjualanComponent', () => {
  let component: DetailRefundPenjualanComponent;
  let fixture: ComponentFixture<DetailRefundPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRefundPenjualanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRefundPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
