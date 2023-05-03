import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPenerimaanTanpaPoComponent } from './input-penerimaan-tanpa-po.component';

describe('InputPenerimaanTanpaPoComponent', () => {
  let component: InputPenerimaanTanpaPoComponent;
  let fixture: ComponentFixture<InputPenerimaanTanpaPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPenerimaanTanpaPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPenerimaanTanpaPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
