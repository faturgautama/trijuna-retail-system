import { Component, Input, OnInit } from '@angular/core';
import { GridModel } from '../../models/components/grid.model';

@Component({
    selector: 'app-prime-grid',
    templateUrl: './prime-grid.component.html',
    styleUrls: ['./prime-grid.component.scss']
})
export class PrimeGridComponent implements OnInit {

    PrimeGridProps: GridModel.IPrimeGrid = {} as any;

    @Input('props') set props(value: GridModel.IPrimeGrid) {
        this.PrimeGridProps = value;
    }

    get props() {
        return this.PrimeGridProps;
    }

    constructor() { }

    ngOnInit(): void {
    }
}
