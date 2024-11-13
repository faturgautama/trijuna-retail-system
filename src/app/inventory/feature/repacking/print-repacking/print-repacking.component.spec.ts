import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRepackingComponent } from './print-repacking.component';

describe('PrintRepackingComponent', () => {
  let component: PrintRepackingComponent;
  let fixture: ComponentFixture<PrintRepackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintRepackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintRepackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
