import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPenerimaanDenganPoComponent } from './print-penerimaan-dengan-po.component';

describe('PrintPenerimaanDenganPoComponent', () => {
  let component: PrintPenerimaanDenganPoComponent;
  let fixture: ComponentFixture<PrintPenerimaanDenganPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPenerimaanDenganPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPenerimaanDenganPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
