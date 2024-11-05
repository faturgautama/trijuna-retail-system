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
                { field: 'urut', headerName: 'No.', },
                { field: 'kode_barang', headerName: 'Kode Barang', },
                { field: 'barcode', headerName: 'Barcode', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number' },
                { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'currency' },
                { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'currency' },
                { field: 'harga_beli_netto', headerName: 'Hg Beli Netto', class: 'text-end', format: 'currency' },
                { field: 'selisih', headerName: 'Selisih', class: 'text-end', format: 'currency' },
                { field: 'harga_jual', headerName: 'Harga Jual', class: 'text-end', format: 'currency' },
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

            this.Data = data;
            this.GridProps.dataSource = data.detail;

            setTimeout(() => {
                window.print();
            }, 1500);
        } else {
            const id = this._activatedRoute.snapshot.params['id'];
            const url = this._router.url;
            const isExportPdf = url.includes('export-pdf');

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
