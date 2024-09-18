import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMutasiMasukComponent } from './detail-mutasi-masuk.component';

describe('DetailMutasiMasukComponent', () => {
  let component: DetailMutasiMasukComponent;
  let fixture: ComponentFixture<DetailMutasiMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMutasiMasukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMutasiMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
