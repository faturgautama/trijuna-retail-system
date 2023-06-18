import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRefundPenjualanComponent } from './input-refund-penjualan.component';

describe('InputRefundPenjualanComponent', () => {
  let component: InputRefundPenjualanComponent;
  let fixture: ComponentFixture<InputRefundPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRefundPenjualanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRefundPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
