import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenjualanComponent } from './detail-penjualan.component';

describe('DetailPenjualanComponent', () => {
  let component: DetailPenjualanComponent;
  let fixture: ComponentFixture<DetailPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DetailPenjualanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
