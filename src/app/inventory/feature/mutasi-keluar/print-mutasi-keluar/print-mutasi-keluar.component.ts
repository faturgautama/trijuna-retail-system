import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-mutasi-keluar',
    templateUrl: './print-mutasi-keluar.component.html',
    styleUrls: ['./print-mutasi-keluar.component.scss']
})
export class PrintMutasiKeluarComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

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
        private _mutasiKeluarService: MutasiKeluarService,
        private _authenticationService: AuthenticationService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', width: '5%' },
                { field: 'kode_barang', headerName: 'Kode Barang', width: '7%' },
                { field: 'barcode', headerName: 'Barcode', width: '5%' },
                { field: 'nama_barang', headerName: 'Nama Barang', width: '43%' },
                { field: 'kode_satuan', headerName: 'Satuan', width: '5%' },
                { field: 'banyak', headerName: 'Banyak', class: 'text-end', format: 'number', width: '5%' },
                { field: 'isi', headerName: 'Isi', class: 'text-end', format: 'number', width: '5%' },
                { field: 'qty', headerName: 'Total Qty', class: 'text-end', format: 'number', width: '5%' },
                { field: 'harga_satuan', headerName: 'Harga Satuan', class: 'text-end', format: 'number', width: '10%' },
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

        this.getDetail(id, isExportPdf);
    }

    getDetail(id: any, exportPdf: boolean) {
        this._mutasiKeluarService
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
                        this._utilityService.exportToPdf('printMutasiKeluar', `Mutasi Lokasi Keluar - ${this.Data.nomor_pemesanan} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }

}
