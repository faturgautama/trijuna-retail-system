import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPenerimaanTanpaPoComponent } from './history-penerimaan-tanpa-po.component';

describe('HistoryPenerimaanTanpaPoComponent', () => {
  let component: HistoryPenerimaanTanpaPoComponent;
  let fixture: ComponentFixture<HistoryPenerimaanTanpaPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPenerimaanTanpaPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPenerimaanTanpaPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
