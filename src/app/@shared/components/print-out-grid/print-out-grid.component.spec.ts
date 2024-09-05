import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOutGridComponent } from './print-out-grid.component';

describe('PrintOutGridComponent', () => {
  let component: PrintOutGridComponent;
  let fixture: ComponentFixture<PrintOutGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintOutGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintOutGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
