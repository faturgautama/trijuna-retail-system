import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupGroupUserComponent } from './setup-group-user.component';

describe('SetupGroupUserComponent', () => {
  let component: SetupGroupUserComponent;
  let fixture: ComponentFixture<SetupGroupUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupGroupUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupGroupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
