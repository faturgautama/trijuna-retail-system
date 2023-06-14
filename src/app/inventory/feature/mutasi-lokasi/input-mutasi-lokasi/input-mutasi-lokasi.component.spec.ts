import { ComponentFixture, TestBed } from '@angular/core/testing';

import InputMutasiLokasiComponent from './input-mutasi-lokasi.component';

describe('InputMutasiLokasiComponent', () => {
    let component: InputMutasiLokasiComponent;
    let fixture: ComponentFixture<InputMutasiLokasiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputMutasiLokasiComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InputMutasiLokasiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
