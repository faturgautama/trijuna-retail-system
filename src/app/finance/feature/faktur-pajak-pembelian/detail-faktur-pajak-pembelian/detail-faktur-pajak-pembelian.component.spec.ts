import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFakturPajakPembelianComponent } from './detail-faktur-pajak-pembelian.component';

describe('DetailFakturPajakPembelianComponent', () => {
  let component: DetailFakturPajakPembelianComponent;
  let fixture: ComponentFixture<DetailFakturPajakPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFakturPajakPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFakturPajakPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
