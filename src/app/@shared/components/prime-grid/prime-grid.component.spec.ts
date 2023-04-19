import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeGridComponent } from './prime-grid.component';

describe('PrimeGridComponent', () => {
  let component: PrimeGridComponent;
  let fixture: ComponentFixture<PrimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
