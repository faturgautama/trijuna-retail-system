import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSatuanPembelianComponent } from './edit-satuan-pembelian.component';

describe('EditSatuanPembelianComponent', () => {
  let component: EditSatuanPembelianComponent;
  let fixture: ComponentFixture<EditSatuanPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSatuanPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSatuanPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
