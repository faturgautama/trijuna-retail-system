import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPemesananPoComponent } from './print-pemesanan-po.component';

describe('PrintPemesananPoComponent', () => {
  let component: PrintPemesananPoComponent;
  let fixture: ComponentFixture<PrintPemesananPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPemesananPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintPemesananPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
