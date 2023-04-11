import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetupSupplierComponent } from './list-setup-supplier.component';

describe('ListSetupSupplierComponent', () => {
  let component: ListSetupSupplierComponent;
  let fixture: ComponentFixture<ListSetupSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSetupSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSetupSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
