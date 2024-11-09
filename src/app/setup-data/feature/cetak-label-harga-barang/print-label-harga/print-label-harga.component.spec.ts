import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLabelHargaComponent } from './print-label-harga.component';

describe('PrintLabelHargaComponent', () => {
  let component: PrintLabelHargaComponent;
  let fixture: ComponentFixture<PrintLabelHargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLabelHargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintLabelHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
