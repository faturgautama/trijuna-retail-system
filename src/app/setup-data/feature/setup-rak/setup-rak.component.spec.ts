import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRakComponent } from './setup-rak.component';

describe('SetupRakComponent', () => {
  let component: SetupRakComponent;
  let fixture: ComponentFixture<SetupRakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupRakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupRakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
