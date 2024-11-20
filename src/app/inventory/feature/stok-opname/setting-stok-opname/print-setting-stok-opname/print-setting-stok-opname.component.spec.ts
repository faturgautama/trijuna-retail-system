import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSettingStokOpnameComponent } from './print-setting-stok-opname.component';

describe('PrintSettingStokOpnameComponent', () => {
  let component: PrintSettingStokOpnameComponent;
  let fixture: ComponentFixture<PrintSettingStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSettingStokOpnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintSettingStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
