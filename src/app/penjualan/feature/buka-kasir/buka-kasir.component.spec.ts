import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BukaKasirComponent } from './buka-kasir.component';

describe('BukaKasirComponent', () => {
  let component: BukaKasirComponent;
  let fixture: ComponentFixture<BukaKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BukaKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BukaKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
