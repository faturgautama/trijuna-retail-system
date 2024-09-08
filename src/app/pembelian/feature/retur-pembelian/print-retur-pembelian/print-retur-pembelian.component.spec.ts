import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReturPembelianComponent } from './print-retur-pembelian.component';

describe('PrintReturPembelianComponent', () => {
  let component: PrintReturPembelianComponent;
  let fixture: ComponentFixture<PrintReturPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintReturPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintReturPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
