import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBarangAllComponent } from './list-barang-all.component';

describe('ListBarangAllComponent', () => {
  let component: ListBarangAllComponent;
  let fixture: ComponentFixture<ListBarangAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBarangAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBarangAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
