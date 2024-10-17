import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSettingStokOpnameComponent } from './input-setting-stok-opname.component';

describe('InputSettingStokOpnameComponent', () => {
  let component: InputSettingStokOpnameComponent;
  let fixture: ComponentFixture<InputSettingStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSettingStokOpnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSettingStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
