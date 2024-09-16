import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupRekeningOwnerComponent } from './setup-rekening-owner.component';

describe('SetupRekeningOwnerComponent', () => {
  let component: SetupRekeningOwnerComponent;
  let fixture: ComponentFixture<SetupRekeningOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupRekeningOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupRekeningOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
