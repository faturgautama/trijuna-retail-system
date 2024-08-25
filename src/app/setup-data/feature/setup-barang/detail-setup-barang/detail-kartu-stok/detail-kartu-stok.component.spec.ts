import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKartuStokComponent } from './detail-kartu-stok.component';

describe('DetailKartuStokComponent', () => {
  let component: DetailKartuStokComponent;
  let fixture: ComponentFixture<DetailKartuStokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailKartuStokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailKartuStokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
