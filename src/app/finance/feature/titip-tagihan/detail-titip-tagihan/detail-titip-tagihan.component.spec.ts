import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTitipTagihanComponent } from './detail-titip-tagihan.component';

describe('DetailTitipTagihanComponent', () => {
  let component: DetailTitipTagihanComponent;
  let fixture: ComponentFixture<DetailTitipTagihanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTitipTagihanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTitipTagihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
