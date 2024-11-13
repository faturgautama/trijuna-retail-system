import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MutasiWarehouseService } from 'src/app/@core/service/inventory/mutasi-warehouse/mutasi-warehouse.service';
import { RepackingService } from 'src/app/@core/service/inventory/repacking/repacking.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-repacking',
    templateUrl: './print-repacking.component.html',
    styleUrls: ['./print-repacking.component.scss']
})
export class PrintRepackingComponent implements OnInit {

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
        private _repackingService: RepackingService
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', width: '5%' },
                { field: 'kode_barang', headerName: 'Kode Barang', width: '7%' },
                { field: 'barcode', headerName: 'Barcode', width: '5%' },
                { field: 'nama_barang', headerName: 'Nama Barang', width: '53%' },
                { field: 'kode_satuan', headerName: 'Satuan', width: '5%' },
                { field: 'qty', headerName: 'Qty', class: 'text-end', format: 'number', width: '5%' },
                { field: 'hpp_average', headerName: 'Hpp Average', class: 'text-end', format: 'currency', width: '10%' },
                { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'currency', width: '10%' },
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

        this.getDetail(id, isExportPdf);
    }

    getDetail(id: any, exportPdf: boolean) {
        this._repackingService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                result.data.qty_urai = 0;

                result.data.detail.forEach((item: any) => {
                    item.qty = parseInt(item.qty);
                    result.data.qty_urai += item.qty;
                });

                if (!exportPdf) {
                    setTimeout(() => {
                        window.print();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printMutasiMasuk', `Repacking - ${this.Data.nomor_mutasi} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }


}
