import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryFakturPajakPembelianComponent } from './history-faktur-pajak-pembelian.component';

describe('HistoryFakturPajakPembelianComponent', () => {
  let component: HistoryFakturPajakPembelianComponent;
  let fixture: ComponentFixture<HistoryFakturPajakPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryFakturPajakPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryFakturPajakPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
