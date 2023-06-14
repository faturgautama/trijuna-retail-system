import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRepackingComponent } from './input-repacking.component';

describe('InputRepackingComponent', () => {
  let component: InputRepackingComponent;
  let fixture: ComponentFixture<InputRepackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRepackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputRepackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
