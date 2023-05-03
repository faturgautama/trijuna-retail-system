import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanTanpaPoComponent } from './detail-penerimaan-tanpa-po.component';

describe('DetailPenerimaanTanpaPoComponent', () => {
  let component: DetailPenerimaanTanpaPoComponent;
  let fixture: ComponentFixture<DetailPenerimaanTanpaPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanTanpaPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPenerimaanTanpaPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
