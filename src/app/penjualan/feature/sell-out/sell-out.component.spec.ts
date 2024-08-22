import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOutComponent } from './sell-out.component';

describe('SellOutComponent', () => {
  let component: SellOutComponent;
  let fixture: ComponentFixture<SellOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
