import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDepartemenComponent } from './setup-departemen.component';

describe('SetupDepartemenComponent', () => {
  let component: SetupDepartemenComponent;
  let fixture: ComponentFixture<SetupDepartemenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDepartemenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupDepartemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
