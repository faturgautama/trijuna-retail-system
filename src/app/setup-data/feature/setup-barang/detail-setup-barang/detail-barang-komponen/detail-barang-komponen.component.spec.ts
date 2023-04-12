import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarangKomponenComponent } from './detail-barang-komponen.component';

describe('DetailBarangKomponenComponent', () => {
  let component: DetailBarangKomponenComponent;
  let fixture: ComponentFixture<DetailBarangKomponenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBarangKomponenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBarangKomponenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
