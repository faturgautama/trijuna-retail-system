import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSettingHargaComponent } from './detail-setting-harga.component';

describe('DetailSettingHargaComponent', () => {
  let component: DetailSettingHargaComponent;
  let fixture: ComponentFixture<DetailSettingHargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSettingHargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSettingHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
