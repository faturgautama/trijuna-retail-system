import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSetupMemberComponent } from './input-setup-member.component';

describe('InputSetupMemberComponent', () => {
  let component: InputSetupMemberComponent;
  let fixture: ComponentFixture<InputSetupMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSetupMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSetupMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
