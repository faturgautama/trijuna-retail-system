import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBarangComponent } from './card-barang.component';

describe('CardBarangComponent', () => {
  let component: CardBarangComponent;
  let fixture: ComponentFixture<CardBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
