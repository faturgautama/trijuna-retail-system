import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPosComponent } from './layout-pos.component';

describe('LayoutPosComponent', () => {
  let component: LayoutPosComponent;
  let fixture: ComponentFixture<LayoutPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutPosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
