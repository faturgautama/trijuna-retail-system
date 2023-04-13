import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSettingHargaComponent } from './list-setting-harga.component';

describe('ListSettingHargaComponent', () => {
  let component: ListSettingHargaComponent;
  let fixture: ComponentFixture<ListSettingHargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSettingHargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSettingHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
