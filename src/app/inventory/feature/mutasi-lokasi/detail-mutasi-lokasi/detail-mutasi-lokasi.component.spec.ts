import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMutasiLokasiComponent } from './detail-mutasi-lokasi.component';

describe('DetailMutasiLokasiComponent', () => {
  let component: DetailMutasiLokasiComponent;
  let fixture: ComponentFixture<DetailMutasiLokasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMutasiLokasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMutasiLokasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
