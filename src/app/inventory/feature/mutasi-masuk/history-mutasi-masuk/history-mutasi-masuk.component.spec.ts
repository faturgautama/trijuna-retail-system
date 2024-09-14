import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMutasiMasukComponent } from './history-mutasi-masuk.component';

describe('HistoryMutasiMasukComponent', () => {
  let component: HistoryMutasiMasukComponent;
  let fixture: ComponentFixture<HistoryMutasiMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryMutasiMasukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryMutasiMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
