import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBarangComponent } from './list-barang.component';

describe('ListBarangComponent', () => {
  let component: ListBarangComponent;
  let fixture: ComponentFixture<ListBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
