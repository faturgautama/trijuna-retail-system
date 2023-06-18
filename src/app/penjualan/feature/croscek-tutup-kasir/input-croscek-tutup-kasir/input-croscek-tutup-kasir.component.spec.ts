import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCroscekTutupKasirComponent } from './input-croscek-tutup-kasir.component';

describe('InputCroscekTutupKasirComponent', () => {
  let component: InputCroscekTutupKasirComponent;
  let fixture: ComponentFixture<InputCroscekTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCroscekTutupKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCroscekTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
