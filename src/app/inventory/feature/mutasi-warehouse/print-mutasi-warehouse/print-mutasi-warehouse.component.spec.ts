import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMutasiWarehouseComponent } from './print-mutasi-warehouse.component';

describe('PrintMutasiWarehouseComponent', () => {
  let component: PrintMutasiWarehouseComponent;
  let fixture: ComponentFixture<PrintMutasiWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMutasiWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMutasiWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
