import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetupMemberComponent } from './list-setup-member.component';

describe('ListSetupMemberComponent', () => {
  let component: ListSetupMemberComponent;
  let fixture: ComponentFixture<ListSetupMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSetupMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSetupMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
