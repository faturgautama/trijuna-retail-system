import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPelunsanTtComponent } from './print-pelunsan-tt.component';

describe('PrintPelunsanTtComponent', () => {
  let component: PrintPelunsanTtComponent;
  let fixture: ComponentFixture<PrintPelunsanTtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPelunsanTtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPelunsanTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
