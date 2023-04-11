import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSetupBarangComponent } from './detail-setup-barang.component';

describe('DetailSetupBarangComponent', () => {
  let component: DetailSetupBarangComponent;
  let fixture: ComponentFixture<DetailSetupBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSetupBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSetupBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
