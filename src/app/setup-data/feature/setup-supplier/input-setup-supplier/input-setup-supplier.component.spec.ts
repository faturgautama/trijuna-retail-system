import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSetupSupplierComponent } from './input-setup-supplier.component';

describe('InputSetupSupplierComponent', () => {
  let component: InputSetupSupplierComponent;
  let fixture: ComponentFixture<InputSetupSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSetupSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSetupSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
