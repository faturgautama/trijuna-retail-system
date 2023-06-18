import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCroscekTutupKasirComponent } from './detail-croscek-tutup-kasir.component';

describe('DetailCroscekTutupKasirComponent', () => {
  let component: DetailCroscekTutupKasirComponent;
  let fixture: ComponentFixture<DetailCroscekTutupKasirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCroscekTutupKasirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCroscekTutupKasirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
