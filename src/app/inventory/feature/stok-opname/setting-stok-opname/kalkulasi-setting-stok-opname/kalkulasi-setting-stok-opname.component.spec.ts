import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalkulasiSettingStokOpnameComponent } from './kalkulasi-setting-stok-opname.component';

describe('KalkulasiSettingStokOpnameComponent', () => {
  let component: KalkulasiSettingStokOpnameComponent;
  let fixture: ComponentFixture<KalkulasiSettingStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KalkulasiSettingStokOpnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KalkulasiSettingStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
