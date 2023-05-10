import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMutasiWarehouseComponent } from './detail-mutasi-warehouse.component';

describe('DetailMutasiWarehouseComponent', () => {
  let component: DetailMutasiWarehouseComponent;
  let fixture: ComponentFixture<DetailMutasiWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMutasiWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMutasiWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
