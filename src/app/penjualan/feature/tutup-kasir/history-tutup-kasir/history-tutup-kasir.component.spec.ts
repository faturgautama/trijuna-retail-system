import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTutupKasirComponent } from './history-tutup-kasir.component';

describe('HistoryTutupKasirComponent', () => {
  let component: HistoryTutupKasirComponent;
  let fixture: ComponentFixture<HistoryTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTutupKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
