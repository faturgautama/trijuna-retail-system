import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSetupBarangComponent } from './list-setup-barang.component';

describe('ListSetupBarangComponent', () => {
  let component: ListSetupBarangComponent;
  let fixture: ComponentFixture<ListSetupBarangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSetupBarangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSetupBarangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
