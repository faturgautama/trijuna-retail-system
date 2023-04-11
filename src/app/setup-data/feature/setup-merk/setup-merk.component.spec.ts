import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMerkComponent } from './setup-merk.component';

describe('SetupMerkComponent', () => {
  let component: SetupMerkComponent;
  let fixture: ComponentFixture<SetupMerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMerkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupMerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
