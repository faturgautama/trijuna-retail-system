import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PemesananPoService } from 'src/app/@core/service/pembelian/pemesanan-po/pemesanan-po.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-pemesanan-po',
    templateUrl: './print-pemesanan-po.component.html',
    styleUrls: ['./print-pemesanan-po.component.scss']
})
export class PrintPemesananPoComponent implements OnInit, AfterViewInit {

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _pemesananPoService: PemesananPoService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', },
                { field: 'kode_barang', headerName: 'Kode Barang', },
                { field: 'barcode', headerName: 'Barcode', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'currency' },
                { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'currency' },
                { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'currency' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];

        this._pemesananPoService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail_pemesanan;

                setTimeout(() => {
                    window.print();
                }, 1500);
            })
    }

    ngAfterViewInit(): void {

    }
}
