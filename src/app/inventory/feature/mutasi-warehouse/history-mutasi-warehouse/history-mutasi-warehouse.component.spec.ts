import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMutasiWarehouseComponent } from './history-mutasi-warehouse.component';

describe('HistoryMutasiWarehouseComponent', () => {
  let component: HistoryMutasiWarehouseComponent;
  let fixture: ComponentFixture<HistoryMutasiWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryMutasiWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryMutasiWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
