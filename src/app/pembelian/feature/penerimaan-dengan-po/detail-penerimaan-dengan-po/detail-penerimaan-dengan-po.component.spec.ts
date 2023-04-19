import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanDenganPoComponent } from './detail-penerimaan-dengan-po.component';

describe('DetailPenerimaanDenganPoComponent', () => {
  let component: DetailPenerimaanDenganPoComponent;
  let fixture: ComponentFixture<DetailPenerimaanDenganPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanDenganPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPenerimaanDenganPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
