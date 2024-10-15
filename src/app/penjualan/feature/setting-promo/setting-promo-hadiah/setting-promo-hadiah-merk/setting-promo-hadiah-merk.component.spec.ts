import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPromoHadiahMerkComponent } from './setting-promo-hadiah-merk.component';

describe('SettingPromoHadiahMerkComponent', () => {
  let component: SettingPromoHadiahMerkComponent;
  let fixture: ComponentFixture<SettingPromoHadiahMerkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPromoHadiahMerkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPromoHadiahMerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
