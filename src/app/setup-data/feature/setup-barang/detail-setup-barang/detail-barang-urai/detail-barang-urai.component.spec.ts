import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBarangUraiComponent } from './detail-barang-urai.component';

describe('DetailBarangUraiComponent', () => {
  let component: DetailBarangUraiComponent;
  let fixture: ComponentFixture<DetailBarangUraiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBarangUraiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBarangUraiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
