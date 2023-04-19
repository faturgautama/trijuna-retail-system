import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPenerimaanDenganPoComponent } from './history-penerimaan-dengan-po.component';

describe('HistoryPenerimaanDenganPoComponent', () => {
  let component: HistoryPenerimaanDenganPoComponent;
  let fixture: ComponentFixture<HistoryPenerimaanDenganPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPenerimaanDenganPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPenerimaanDenganPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
