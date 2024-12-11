import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
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

    UserData: any = this._authenticationService.userData;

    IsPembelianTanpaPo = false;

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
        private _authenticationService: AuthenticationService,
        private _pembelianTanpaPoService: PembelianTanpaPoService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', width: '5%' },
                { field: 'kode_barang', headerName: 'Kode Barang', width: '7%' },
                { field: 'barcode', headerName: 'Barcode', width: '5%' },
                { field: 'nama_barang', headerName: 'Nama Barang', width: '53%' },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '5%' },
                { field: 'satuan', headerName: 'Satuan', width: '5%' },
                { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'number', width: '10%' },
                { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'number', width: '10%' },
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
            this.IsPembelianTanpaPo = true;

            this.GridProps = {
                id: 'print-out-master-barang',
                column: [
                    { field: 'urut', headerName: 'No.', width: '5%' },
                    { field: 'kode_barang', headerName: 'Kode Barang', width: '9%' },
                    { field: 'barcode', headerName: 'Barcode', width: '5%' },
                    { field: 'nama_barang', headerName: 'Nama Barang', width: '25%' },
                    { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '5%' },
                    { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'number', width: '8%' },
                    { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'number', width: '10%' },
                    { field: 'harga_beli_netto', headerName: 'Hg Beli Netto', class: 'text-end', format: 'number', width: '10%' },
                    { field: 'selisih', headerName: 'Selisih', class: 'text-end', format: 'number', width: '7%' },
                    { field: 'harga_jual', headerName: 'Harga Jual', class: 'text-end', format: 'number', width: '10%' },
                ],
                dataSource: [],
                height: "100%",
                showPaging: false,
            };
            this.getPembelianTanpaPo(id, isExportPdf);

        } else {
            this.IsPembelianTanpaPo = false;

            this.GridProps = {
                id: 'print-out-master-barang',
                column: [
                    { field: 'urut', headerName: 'No.', width: '5%' },
                    { field: 'kode_barang', headerName: 'Kode Barang', width: '7%' },
                    { field: 'barcode', headerName: 'Barcode', width: '5%' },
                    { field: 'nama_barang', headerName: 'Nama Barang', width: '41%' },
                    { field: 'omset', headerName: 'Omset', width: '6%' },
                    { field: 'stok', headerName: 'Stok', width: '6%' },
                    { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '5%' },
                    { field: 'kode_satuan', headerName: 'Satuan', width: '5%' },
                    { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'number', width: '10%' },
                    { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'number', width: '10%' },
                ],
                dataSource: [],
                height: "100%",
                showPaging: false,
            };

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
