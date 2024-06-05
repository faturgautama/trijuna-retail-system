import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPenjualanComponent } from './history-penjualan.component';

describe('HistoryPenjualanComponent', () => {
  let component: HistoryPenjualanComponent;
  let fixture: ComponentFixture<HistoryPenjualanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPenjualanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPenjualanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
