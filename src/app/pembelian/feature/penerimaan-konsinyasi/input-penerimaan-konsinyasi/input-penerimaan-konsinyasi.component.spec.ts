import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPenerimaanKonsinyasiComponent } from './input-penerimaan-konsinyasi.component';

describe('InputPenerimaanKonsinyasiComponent', () => {
  let component: InputPenerimaanKonsinyasiComponent;
  let fixture: ComponentFixture<InputPenerimaanKonsinyasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPenerimaanKonsinyasiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPenerimaanKonsinyasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
