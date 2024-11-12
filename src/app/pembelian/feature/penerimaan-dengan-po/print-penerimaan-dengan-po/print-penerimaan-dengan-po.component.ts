import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PembelianDenganPoService } from 'src/app/@core/service/pembelian/pembelian-dengan-po/pembelian-dengan-po.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-penerimaan-dengan-po',
    templateUrl: './print-penerimaan-dengan-po.component.html',
    styleUrls: ['./print-penerimaan-dengan-po.component.scss']
})
export class PrintPenerimaanDenganPoComponent implements OnInit {

    IsPrintDraft = this._router.url.includes('draft');

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        if (this.IsPrintDraft) {
            window.close();
        } else {
            window.history.back();
        }
    }

    constructor(
        private _router: Router,
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _pembelianDenganPoService: PembelianDenganPoService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', width: '5%' },
                { field: 'kode_barang', headerName: 'Kode Barang', width: '7%' },
                { field: 'barcode', headerName: 'Barcode', width: '7%' },
                { field: 'nama_barang', headerName: 'Nama Barang', width: '28%' },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '5%' },
                { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'currency', width: '10%' },
                { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'currency', width: '8%' },
                { field: 'harga_beli_netto', headerName: 'Hg Beli Netto', class: 'text-end', format: 'currency', width: '10%' },
                { field: 'selisih', headerName: 'Selisih', class: 'text-end', format: 'currency', width: '8%' },
                { field: 'harga_jual', headerName: 'Harga Jual', class: 'text-end', format: 'currency', width: '7%' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        if (this.IsPrintDraft) {
            let data = JSON.parse(localStorage.getItem('_PRINT_DRAFT_PEMBELIAN_PO_') as any);
            data.created_at = data.tanggal_nota;

            this.GridProps = {
                id: 'print-out-master-barang',
                column: [
                    { field: 'urut', headerName: 'No.', width: '5%' },
                    { field: 'kode_barang', headerName: 'Kode Barang', width: '10%' },
                    { field: 'barcode', headerName: 'Barcode', width: '10%' },
                    { field: 'nama_barang', headerName: 'Nama Barang', width: '60%' },
                    { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '15%' },
                ],
                dataSource: [],
                height: "100%",
                showPaging: false,
            };

            this.Data = data;
            this.GridProps.dataSource = data.detail;

            setTimeout(() => {
                window.print();
            }, 1500);
        } else {
            const id = this._activatedRoute.snapshot.params['id'];
            const url = this._router.url;
            const isExportPdf = url.includes('export-pdf');

            this.GridProps = {
                id: 'print-out-master-barang',
                column: [
                    { field: 'urut', headerName: 'No.', width: '5%' },
                    { field: 'kode_barang', headerName: 'Kode Barang', width: '10%' },
                    { field: 'barcode', headerName: 'Barcode', width: '10%' },
                    { field: 'nama_barang', headerName: 'Nama Barang', width: '60%' },
                    { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '15%' },
                    // { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'currency', width: '8%' },
                    // { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'currency', width: '10%' },
                    // { field: 'harga_beli_netto', headerName: 'Hg Beli Netto', class: 'text-end', format: 'currency', width: '10%' },
                    // { field: 'selisih', headerName: 'Selisih', class: 'text-end', format: 'currency', width: '7%' },
                    // { field: 'harga_jual', headerName: 'Harga Jual', class: 'text-end', format: 'currency', width: '10%' },
                ],
                dataSource: [],
                height: "100%",
                showPaging: false,
            };

            this._pembelianDenganPoService
                .getById(id)
                .subscribe((result) => {
                    this.Data = result.data;
                    this.GridProps.dataSource = result.data.detail;

                    if (!isExportPdf) {
                        setTimeout(() => {
                            window.print();
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            this._utilityService.exportToPdf('printPenerimaanDenganPo', `Penerimaan Barang Dengan PO - ${this.Data.nomor_penerimaan} - ${new Date().getTime()}`);
                        }, 500);
                    }
                })
        }
    }

}
