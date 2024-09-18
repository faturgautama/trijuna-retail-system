import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMutasiKeluarComponent } from './history-mutasi-keluar.component';

describe('HistoryMutasiKeluarComponent', () => {
  let component: HistoryMutasiKeluarComponent;
  let fixture: ComponentFixture<HistoryMutasiKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryMutasiKeluarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryMutasiKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
