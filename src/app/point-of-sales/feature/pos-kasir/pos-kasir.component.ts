import { Component, OnInit, ViewChild } from '@angular/core';
import { ListBarangComponent } from '../../component/list-barang/list-barang.component';

@Component({
    selector: 'app-pos-kasir',
    templateUrl: './pos-kasir.component.html',
    styleUrls: ['./pos-kasir.component.scss']
})
export class PosKasirComponent implements OnInit {

    Date: Date = new Date();

    @ViewChild('ListBarang') ListBarang!: ListBarangComponent;

    Order: any[] = [];

    ngOnInit(): void {
    }

    handleEnterBarcode(barcode: string): void {
        this.ListBarang.handleSearchByBarcode(barcode);
    }

    handleSelectedBarang(args: any): void {
        const payload = {
            ...args,
            qty: 1,
        };

        const index = this.Order.findIndex((item) => { return item.id_barang == args.id_barang });

        if (index < 0) {
            this.Order.push(payload);
        } else {
            this.Order[index].qty += 1;
            this.Order = this.Order;
        }
    }
}
