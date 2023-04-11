import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWarehouseComponent } from './setup-warehouse.component';

describe('SetupWarehouseComponent', () => {
  let component: SetupWarehouseComponent;
  let fixture: ComponentFixture<SetupWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
