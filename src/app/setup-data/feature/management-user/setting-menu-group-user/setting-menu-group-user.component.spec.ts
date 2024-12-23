import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingMenuGroupUserComponent } from './setting-menu-group-user.component';

describe('SettingMenuGroupUserComponent', () => {
  let component: SettingMenuGroupUserComponent;
  let fixture: ComponentFixture<SettingMenuGroupUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingMenuGroupUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingMenuGroupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
