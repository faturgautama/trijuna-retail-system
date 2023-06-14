import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRepackingComponent } from './detail-repacking.component';

describe('DetailRepackingComponent', () => {
  let component: DetailRepackingComponent;
  let fixture: ComponentFixture<DetailRepackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRepackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRepackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
