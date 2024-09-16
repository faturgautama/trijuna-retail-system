import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPelunasanTtComponent } from './payment-pelunasan-tt.component';

describe('PaymentPelunasanTtComponent', () => {
  let component: PaymentPelunasanTtComponent;
  let fixture: ComponentFixture<PaymentPelunasanTtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPelunasanTtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPelunasanTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
