import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPelunasanTtComponent } from './history-pelunasan-tt.component';

describe('HistoryPelunasanTtComponent', () => {
  let component: HistoryPelunasanTtComponent;
  let fixture: ComponentFixture<HistoryPelunasanTtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPelunasanTtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPelunasanTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
