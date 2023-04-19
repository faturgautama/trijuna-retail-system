import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPenerimaanDenganPoComponent } from './input-penerimaan-dengan-po.component';

describe('InputPenerimaanDenganPoComponent', () => {
  let component: InputPenerimaanDenganPoComponent;
  let fixture: ComponentFixture<InputPenerimaanDenganPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPenerimaanDenganPoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPenerimaanDenganPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
