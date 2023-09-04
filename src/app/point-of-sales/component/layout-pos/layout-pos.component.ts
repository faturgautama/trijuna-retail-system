import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-layout-pos',
    templateUrl: './layout-pos.component.html',
    styleUrls: ['./layout-pos.component.scss']
})
export class LayoutPosComponent {

    DaftarOrder: any[] = [];

    @Input('order') set order(value: any) {
        this.DaftarOrder = value;
        setTimeout(() => {
            console.log("Layout POS Props =>", value);
        }, 1000);
    }

    get order() {
        return this.DaftarOrder;
    }
}
