import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProduksiAssemblyComponent } from './detail-produksi-assembly.component';

describe('DetailProduksiAssemblyComponent', () => {
  let component: DetailProduksiAssemblyComponent;
  let fixture: ComponentFixture<DetailProduksiAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProduksiAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProduksiAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
