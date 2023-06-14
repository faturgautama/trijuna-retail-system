import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRepackingComponent } from './history-repacking.component';

describe('HistoryRepackingComponent', () => {
  let component: HistoryRepackingComponent;
  let fixture: ComponentFixture<HistoryRepackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryRepackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryRepackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
