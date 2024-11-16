import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { PelunasanHutangSupplierService } from 'src/app/@core/service/finance/pelunasan-hutang-supplier/pelunasan-hutang-supplier.service';
import { TitipTagihanService } from 'src/app/@core/service/finance/titip-tagihan/titip-tagihan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-pelunsan-tt',
    templateUrl: './print-pelunsan-tt.component.html',
    styleUrls: ['./print-pelunsan-tt.component.scss']
})
export class PrintPelunsanTtComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    GridTransferProps: PrintOutGridModel.IGrid;

    GridGiroProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _pelunasanHutangSupplierService: PelunasanHutangSupplierService,
    ) {
        this.GridProps = {
            id: 'print-out-cash',
            column: [
                { field: 'waktu_penyerahan', headerName: 'Waktu Penyerahan', format: 'date' },
                { field: 'pemberi_uang', headerName: 'Pemberi Uang', },
                { field: 'penerima_uang', headerName: 'Penerima Uang', },
                { field: 'nominal_bayar', headerName: 'Nominal Bayar', class: 'text-end', format: 'number' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };

        this.GridTransferProps = {
            id: 'print-out-transfer',
            column: [
                { field: 'waktu_bayar', headerName: 'Waktu Bayar', format: 'date' },
                { field: 'bank', headerName: 'Nama Bank', },
                { field: 'nomor_rekening', headerName: 'No. Rekening', },
                { field: 'nama_rekening', headerName: 'Nama Rekening', },
                { field: 'nominal_bayar', headerName: 'Nominal Bayar', class: 'text-end', format: 'number' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };

        this.GridGiroProps = {
            id: 'print-out-giro',
            column: [
                { field: 'no_giro', headerName: 'No. Giro', },
                { field: 'tanggal_jatuh_tempo', headerName: 'Tgl. Jatuh Tempo', format: 'date' },
                { field: 'nominal_bayar', headerName: 'Nominal Bayar', class: 'text-end', format: 'number' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];

        this._pelunasanHutangSupplierService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.cash;
                this.GridGiroProps.dataSource = result.data.giro;
                this.GridTransferProps.dataSource = [result.data.transfer];

                // setTimeout(() => {
                //     window.print();
                // }, 1500);
            })
    }


}
