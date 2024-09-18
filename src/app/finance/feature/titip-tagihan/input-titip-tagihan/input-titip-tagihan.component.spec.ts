import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTitipTagihanComponent } from './input-titip-tagihan.component';

describe('InputTitipTagihanComponent', () => {
  let component: InputTitipTagihanComponent;
  let fixture: ComponentFixture<InputTitipTagihanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTitipTagihanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTitipTagihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
