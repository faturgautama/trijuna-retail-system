import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTutupKasirComponent } from './detail-tutup-kasir.component';

describe('DetailTutupKasirComponent', () => {
  let component: DetailTutupKasirComponent;
  let fixture: ComponentFixture<DetailTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTutupKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
