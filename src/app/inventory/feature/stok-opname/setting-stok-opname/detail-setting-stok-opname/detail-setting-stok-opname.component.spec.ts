import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSettingStokOpnameComponent } from './detail-setting-stok-opname.component';

describe('DetailSettingStokOpnameComponent', () => {
  let component: DetailSettingStokOpnameComponent;
  let fixture: ComponentFixture<DetailSettingStokOpnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSettingStokOpnameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSettingStokOpnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
