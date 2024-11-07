import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMutasiMasukComponent } from './print-mutasi-masuk.component';

describe('PrintMutasiMasukComponent', () => {
  let component: PrintMutasiMasukComponent;
  let fixture: ComponentFixture<PrintMutasiMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMutasiMasukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMutasiMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
