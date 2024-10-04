import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTitipTagihanComponent } from './print-titip-tagihan.component';

describe('PrintTitipTagihanComponent', () => {
  let component: PrintTitipTagihanComponent;
  let fixture: ComponentFixture<PrintTitipTagihanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintTitipTagihanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintTitipTagihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
