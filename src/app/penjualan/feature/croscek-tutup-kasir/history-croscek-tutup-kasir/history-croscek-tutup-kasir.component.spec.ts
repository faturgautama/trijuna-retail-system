import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCroscekTutupKasirComponent } from './history-croscek-tutup-kasir.component';

describe('HistoryCroscekTutupKasirComponent', () => {
  let component: HistoryCroscekTutupKasirComponent;
  let fixture: ComponentFixture<HistoryCroscekTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCroscekTutupKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCroscekTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
