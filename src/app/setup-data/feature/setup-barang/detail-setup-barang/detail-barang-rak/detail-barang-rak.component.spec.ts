import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarangRakComponent } from './detail-barang-rak.component';

describe('DetailBarangRakComponent', () => {
  let component: DetailBarangRakComponent;
  let fixture: ComponentFixture<DetailBarangRakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBarangRakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBarangRakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
