import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMutasiKeluarComponent } from './input-mutasi-keluar.component';

describe('InputMutasiKeluarComponent', () => {
  let component: InputMutasiKeluarComponent;
  let fixture: ComponentFixture<InputMutasiKeluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMutasiKeluarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMutasiKeluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
