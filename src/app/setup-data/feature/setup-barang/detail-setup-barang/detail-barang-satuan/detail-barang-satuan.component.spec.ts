import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarangSatuanComponent } from './detail-barang-satuan.component';

describe('DetailBarangSatuanComponent', () => {
  let component: DetailBarangSatuanComponent;
  let fixture: ComponentFixture<DetailBarangSatuanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBarangSatuanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBarangSatuanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
