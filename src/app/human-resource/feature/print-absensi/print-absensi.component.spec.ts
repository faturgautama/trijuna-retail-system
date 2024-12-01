import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAbsensiComponent } from './print-absensi.component';

describe('PrintAbsensiComponent', () => {
  let component: PrintAbsensiComponent;
  let fixture: ComponentFixture<PrintAbsensiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintAbsensiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintAbsensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
