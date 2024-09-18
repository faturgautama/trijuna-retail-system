import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMutasiKeluarComponent } from './detail-mutasi-keluar.component';

describe('DetailMutasiKeluarComponent', () => {
  let component: DetailMutasiKeluarComponent;
  let fixture: ComponentFixture<DetailMutasiKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMutasiKeluarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMutasiKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
