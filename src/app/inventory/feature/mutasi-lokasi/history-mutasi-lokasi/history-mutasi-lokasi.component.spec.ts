import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMutasiLokasiComponent } from './history-mutasi-lokasi.component';

describe('HistoryMutasiLokasiComponent', () => {
  let component: HistoryMutasiLokasiComponent;
  let fixture: ComponentFixture<HistoryMutasiLokasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryMutasiLokasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryMutasiLokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
