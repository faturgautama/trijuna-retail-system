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

    TotalQty: number = 0;

    GrandTotal: number = 0;

    onDecreaseQty(index: number): void {
        if (this.DaftarOrder[index].qty > 0) {
            this.DaftarOrder[index].qty -= 1;
        };

        if (this.DaftarOrder[index].qty < 1) {
            this.DaftarOrder.splice(index, 1);
        };

        this.countTotalQty();
    }

    onIncreaseQty(index: number): void {
        this.DaftarOrder[index].qty += 1;
        this.countTotalQty();
    }

    private countTotalQty(): void {
        this.TotalQty = 0;
        this.GrandTotal = 0;

        this.DaftarOrder.forEach((item) => {
            console.log(item);
            
            this.TotalQty += item.qty;
            this.GrandTotal += item.harga_jual;
        });

        console.log(this.TotalQty, this.GrandTotal);
    }
}
