import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryProduksiAssemblyComponent } from './history-produksi-assembly.component';

describe('HistoryProduksiAssemblyComponent', () => {
  let component: HistoryProduksiAssemblyComponent;
  let fixture: ComponentFixture<HistoryProduksiAssemblyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryProduksiAssemblyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryProduksiAssemblyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
