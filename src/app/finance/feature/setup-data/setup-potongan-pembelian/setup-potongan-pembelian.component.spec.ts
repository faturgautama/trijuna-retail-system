import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupPotonganPembelianComponent } from './setup-potongan-pembelian.component';

describe('SetupPotonganPembelianComponent', () => {
  let component: SetupPotonganPembelianComponent;
  let fixture: ComponentFixture<SetupPotonganPembelianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupPotonganPembelianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupPotonganPembelianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
