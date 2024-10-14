import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { ReturPembelianService } from 'src/app/@core/service/pembelian/retur-pembelian/retur-pembelian.service';
import { CroscekTutupKasirService } from 'src/app/@core/service/penjualan/croscek-tutup-kasir/croscek-tutup-kasir.service';
import { SetupSupplierService } from 'src/app/@core/service/setup-data/setup-supplier/setup-supplier.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-croscek-tutup-kasir',
    templateUrl: './print-croscek-tutup-kasir.component.html',
    styleUrls: ['./print-croscek-tutup-kasir.component.scss']
})
export class PrintCroscekTutupKasirComponent implements OnInit {

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    UserData: any = this._authenticationService.userData;

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _croscekTutupKasirService: CroscekTutupKasirService,
    ) {
        this.GridProps = {
            id: 'print-out-croscek-tutup-kasir',
            column: [
                { field: 'nama_payment_method', headerName: 'Metode Bayar', },
                { field: 'nominal', headerName: 'Jumlah Diterima', format: 'currency' },
                { field: 'nominal_sistem', headerName: 'Jumlah Diterima Versi Sistem', format: 'currency' },
                { field: 'selisih', headerName: 'Selisih', format: 'currency' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        this.getDetail(id);
    }

    private getDetail(id: any) {
        this._croscekTutupKasirService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail_pendapatan;

                setTimeout(() => {
                    window.print();
                }, 1500);
            })
    }

}
