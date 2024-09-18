import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCroscekTutupKasirComponent } from './print-croscek-tutup-kasir.component';

describe('PrintCroscekTutupKasirComponent', () => {
  let component: PrintCroscekTutupKasirComponent;
  let fixture: ComponentFixture<PrintCroscekTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCroscekTutupKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCroscekTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
