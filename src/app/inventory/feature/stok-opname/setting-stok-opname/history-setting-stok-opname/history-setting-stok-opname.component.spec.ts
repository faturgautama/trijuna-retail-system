import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySettingStokOpnameComponent } from './history-setting-stok-opname.component';

describe('HistorySettingStokOpnameComponent', () => {
  let component: HistorySettingStokOpnameComponent;
  let fixture: ComponentFixture<HistorySettingStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorySettingStokOpnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySettingStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
