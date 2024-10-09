import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-mutasi-keluar',
    templateUrl: './print-mutasi-keluar.component.html',
    styleUrls: ['./print-mutasi-keluar.component.scss']
})
export class PrintMutasiKeluarComponent implements OnInit {

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        // window.history.back();
    }

    constructor(
        private _router: Router,
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _mutasiKeluarService: MutasiKeluarService
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'kode_satuan', headerName: 'Satuan', },
                { field: 'banyak', headerName: 'Banyak', class: 'text-end', format: 'currency' },
                { field: 'isi', headerName: 'Isi', class: 'text-end', format: 'currency' },
                { field: 'qty', headerName: 'Total Qty', class: 'text-end', format: 'currency' },
                { field: 'harga_satuan', headerName: 'Harga Satuan', class: 'text-end', format: 'currency' },
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

        this.getDetail(id, isExportPdf);
    }

    getDetail(id: any, exportPdf: boolean) {
        this._mutasiKeluarService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                if (!exportPdf) {
                    // setTimeout(() => {
                    //     window.print();
                    // }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printMutasiKeluar', `Mutasi Lokasi Keluar - ${this.Data.nomor_pemesanan} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }

}
