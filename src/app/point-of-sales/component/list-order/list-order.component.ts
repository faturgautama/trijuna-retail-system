import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {

    DaftarOrder: any[] = [];

    @Input('order') set order(value: any[]) {
        this.DaftarOrder = value;
    }

    get order() {
        return this.DaftarOrder;
    }

    onDecreaseQty(index: number): void {
        if (this.DaftarOrder[index].qty > 0) {
            this.DaftarOrder[index].qty -= 1;
        };

        if (this.DaftarOrder[index].qty < 1) {
            this.DaftarOrder.splice(index, 1);
        };
    }

    onIncreaseQty(index: number): void {
        this.DaftarOrder[index].qty += 1;
    }
}
