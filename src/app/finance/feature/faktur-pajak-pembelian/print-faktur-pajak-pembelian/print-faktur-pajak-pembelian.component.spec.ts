import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFakturPajakPembelianComponent } from './print-faktur-pajak-pembelian.component';

describe('PrintFakturPajakPembelianComponent', () => {
  let component: PrintFakturPajakPembelianComponent;
  let fixture: ComponentFixture<PrintFakturPajakPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintFakturPajakPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintFakturPajakPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
