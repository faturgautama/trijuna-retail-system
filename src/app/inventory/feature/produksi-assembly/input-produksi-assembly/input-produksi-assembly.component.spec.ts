import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputProduksiAssemblyComponent } from './input-produksi-assembly.component';

describe('InputProduksiAssemblyComponent', () => {
  let component: InputProduksiAssemblyComponent;
  let fixture: ComponentFixture<InputProduksiAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputProduksiAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputProduksiAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
