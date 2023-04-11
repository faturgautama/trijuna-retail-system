import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupDivisiComponent } from './setup-divisi.component';

describe('SetupDivisiComponent', () => {
  let component: SetupDivisiComponent;
  let fixture: ComponentFixture<SetupDivisiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupDivisiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupDivisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
