import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFakturPajakPembelianComponent } from './input-faktur-pajak-pembelian.component';

describe('InputFakturPajakPembelianComponent', () => {
  let component: InputFakturPajakPembelianComponent;
  let fixture: ComponentFixture<InputFakturPajakPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFakturPajakPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFakturPajakPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
