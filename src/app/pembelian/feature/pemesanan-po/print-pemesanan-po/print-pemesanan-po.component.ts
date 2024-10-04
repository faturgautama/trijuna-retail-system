import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PembelianTanpaPoService } from 'src/app/@core/service/pembelian/pembelian-tanpa-po/pembelian-tanpa-po.service';
import { PemesananPoService } from 'src/app/@core/service/pembelian/pemesanan-po/pemesanan-po.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-pemesanan-po',
    templateUrl: './print-pemesanan-po.component.html',
    styleUrls: ['./print-pemesanan-po.component.scss']
})
export class PrintPemesananPoComponent implements OnInit {

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        private _router: Router,
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _pemesananPoService: PemesananPoService,
        private _pembelianTanpaPoService: PembelianTanpaPoService,
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
        const url = this._router.url;

        const isExportPdf = url.includes('export-pdf');

        if (url.includes('penerimaan-tanpa-po')) {
            this.getPembelianTanpaPo(id, isExportPdf);
        } else {
            this.getPemesananPo(id, isExportPdf);
        }
    }

    getPemesananPo(id: any, exportPdf: boolean) {
        this._pemesananPoService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail_pemesanan;

                if (!exportPdf) {
                    setTimeout(() => {
                        window.print();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printPemesananPo', `Pemesanan PO - ${this.Data.nomor_pemesanan} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }

    getPembelianTanpaPo(id: any, exportPdf: boolean) {
        this._pembelianTanpaPoService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                if (!exportPdf) {
                    setTimeout(() => {
                        window.print();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printPemesananPo', `Pembelian Tanpa PO - ${this.Data.nomor_penerimaan} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }
}
