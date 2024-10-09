import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMutasiKeluarComponent } from './print-mutasi-keluar.component';

describe('PrintMutasiKeluarComponent', () => {
  let component: PrintMutasiKeluarComponent;
  let fixture: ComponentFixture<PrintMutasiKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMutasiKeluarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintMutasiKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
