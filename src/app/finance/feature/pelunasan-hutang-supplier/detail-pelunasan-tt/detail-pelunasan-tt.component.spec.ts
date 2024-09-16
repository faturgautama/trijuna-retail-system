import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPelunasanTtComponent } from './detail-pelunasan-tt.component';

describe('DetailPelunasanTtComponent', () => {
  let component: DetailPelunasanTtComponent;
  let fixture: ComponentFixture<DetailPelunasanTtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPelunasanTtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPelunasanTtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
