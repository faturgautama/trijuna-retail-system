import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPelunasanTtComponent } from './input-pelunasan-tt.component';

describe('InputPelunasanTtComponent', () => {
  let component: InputPelunasanTtComponent;
  let fixture: ComponentFixture<InputPelunasanTtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPelunasanTtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPelunasanTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
