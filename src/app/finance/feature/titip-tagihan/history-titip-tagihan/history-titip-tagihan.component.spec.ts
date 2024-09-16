import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTitipTagihanComponent } from './history-titip-tagihan.component';

describe('HistoryTitipTagihanComponent', () => {
  let component: HistoryTitipTagihanComponent;
  let fixture: ComponentFixture<HistoryTitipTagihanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTitipTagihanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryTitipTagihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
