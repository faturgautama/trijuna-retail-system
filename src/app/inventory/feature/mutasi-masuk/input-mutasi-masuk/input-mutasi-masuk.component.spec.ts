import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMutasiMasukComponent } from './input-mutasi-masuk.component';

describe('InputMutasiMasukComponent', () => {
  let component: InputMutasiMasukComponent;
  let fixture: ComponentFixture<InputMutasiMasukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMutasiMasukComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMutasiMasukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
