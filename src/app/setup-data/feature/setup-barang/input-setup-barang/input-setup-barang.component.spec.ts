import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSetupBarangComponent } from './input-setup-barang.component';

describe('InputSetupBarangComponent', () => {
  let component: InputSetupBarangComponent;
  let fixture: ComponentFixture<InputSetupBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSetupBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSetupBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
