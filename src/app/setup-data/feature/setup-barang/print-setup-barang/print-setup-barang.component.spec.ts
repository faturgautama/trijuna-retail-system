import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSetupBarangComponent } from './print-setup-barang.component';

describe('PrintSetupBarangComponent', () => {
  let component: PrintSetupBarangComponent;
  let fixture: ComponentFixture<PrintSetupBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSetupBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintSetupBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
