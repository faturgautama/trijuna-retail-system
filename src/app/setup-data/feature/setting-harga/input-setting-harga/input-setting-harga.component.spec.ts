import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSettingHargaComponent } from './input-setting-harga.component';

describe('InputSettingHargaComponent', () => {
  let component: InputSettingHargaComponent;
  let fixture: ComponentFixture<InputSettingHargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSettingHargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSettingHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
