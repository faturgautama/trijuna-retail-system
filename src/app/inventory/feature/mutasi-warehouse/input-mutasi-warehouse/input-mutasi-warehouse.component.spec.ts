import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMutasiWarehouseComponent } from './input-mutasi-warehouse.component';

describe('InputMutasiWarehouseComponent', () => {
  let component: InputMutasiWarehouseComponent;
  let fixture: ComponentFixture<InputMutasiWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMutasiWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMutasiWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
