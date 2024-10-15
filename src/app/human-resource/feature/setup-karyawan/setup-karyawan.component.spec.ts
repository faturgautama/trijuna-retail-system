import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupKaryawanComponent } from './setup-karyawan.component';

describe('SetupKaryawanComponent', () => {
  let component: SetupKaryawanComponent;
  let fixture: ComponentFixture<SetupKaryawanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupKaryawanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupKaryawanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
