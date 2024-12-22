import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { FakturPajakPembelianService } from 'src/app/@core/service/finance/faktur-pajak-pembelian/faktur-pajak-pembelian.service';
import { PembelianDenganPoService } from 'src/app/@core/service/pembelian/pembelian-dengan-po/pembelian-dengan-po.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-faktur-pajak-pembelian',
    templateUrl: './print-faktur-pajak-pembelian.component.html',
    styleUrls: ['./print-faktur-pajak-pembelian.component.scss']
})
export class PrintFakturPajakPembelianComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

    IsPrintDraft = this._router.url.includes('draft');

    IsPrintHistory = this._router.url.includes('print-history');

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        // if (this.IsPrintDraft) {
        //     window.close();
        // } else {
        //     window.history.back();
        // }
    }

    constructor(
        private _router: Router,
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _fakturPajakPembelianService: FakturPajakPembelianService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', width: '5%' },
                { field: 'kode_barang', headerName: 'Kode Barang', width: '7%' },
                { field: 'barcode', headerName: 'Barcode', width: '7%' },
                { field: 'nama_barang', headerName: 'Nama Barang', width: '28%' },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'number', width: '5%' },
                { field: 'harga_order', headerName: 'Harga Satuan', class: 'text-end', format: 'number', width: '10%' },
                { field: 'sub_total', headerName: 'Total Harga', class: 'text-end', format: 'number', width: '8%' },
                { field: 'harga_beli_netto', headerName: 'Hg Beli Netto', class: 'text-end', format: 'number', width: '10%' },
                { field: 'selisih', headerName: 'Selisih', class: 'text-end', format: 'number', width: '8%' },
                { field: 'harga_jual', headerName: 'Harga Jual', class: 'text-end', format: 'number', width: '7%' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];

        this._fakturPajakPembelianService
            .getById(id)
            .subscribe((result) => {
                console.log(result);
                console.log(this.UserData);
            })
    }

}
