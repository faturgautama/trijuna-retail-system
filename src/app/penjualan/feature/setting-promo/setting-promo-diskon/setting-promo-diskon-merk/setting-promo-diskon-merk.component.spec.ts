import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoDiskonMerkComponent } from './setting-promo-diskon-merk.component';

describe('SettingPromoDiskonMerkComponent', () => {
  let component: SettingPromoDiskonMerkComponent;
  let fixture: ComponentFixture<SettingPromoDiskonMerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoDiskonMerkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoDiskonMerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
