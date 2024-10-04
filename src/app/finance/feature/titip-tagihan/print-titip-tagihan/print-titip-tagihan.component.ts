import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { TitipTagihanService } from 'src/app/@core/service/finance/titip-tagihan/titip-tagihan.service';
import { PembelianDenganPoService } from 'src/app/@core/service/pembelian/pembelian-dengan-po/pembelian-dengan-po.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-titip-tagihan',
    templateUrl: './print-titip-tagihan.component.html',
    styleUrls: ['./print-titip-tagihan.component.scss']
})
export class PrintTitipTagihanComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    GridReturProps: PrintOutGridModel.IGrid;

    GridPotonganPembelianProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _titipTagihanService: TitipTagihanService,
        private _authenticationService: AuthenticationService,
    ) {
        this.GridProps = {
            id: 'print-out-titip-tagihan',
            column: [
                { field: 'nomor_penerimaan', headerName: 'No. Penerimaan', },
                { field: 'tanggal_nota', headerName: 'Tgl. Nota', format: 'date' },
                { field: 'created_at', headerName: 'Waktu Input', format: 'date' },
                { field: 'total_transaksi', headerName: 'Total Transaksi', class: 'text-end', format: 'currency' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };

        this.GridReturProps = {
            id: 'print-out-retur',
            column: [
                { field: 'nomor_retur_pembelian', headerName: 'No. Retur', },
                { field: 'tanggal_retur_pembelian', headerName: 'Tgl. Retur', format: 'date' },
                { field: 'total_harga', headerName: 'Total Harga', class: 'text-end', format: 'currency' },
                { field: 'qty', headerName: 'Qty', class: 'text-end', format: 'currency' },
                { field: 'created_at', headerName: 'Waktu Input', class: 'text-end', format: 'date' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };

        this.GridPotonganPembelianProps = {
            id: 'print-out-potongan-pembelian',
            column: [
                { field: 'potongan_pembelian', headerName: 'Potongan Pembelian', },
                { field: 'total_potongan', headerName: 'Total Potongan', class: 'text-end', format: 'currency' }
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];

        console.log("user =>", this.UserData);

        this._titipTagihanService
            .getById(id)
            .subscribe((result) => {

                let total_retur = 0;

                result.data.retur.forEach((item: any) => {
                    item.total_harga = parseFloat(item.total_harga);
                    total_retur += item.total_harga;
                });

                result.data.total_retur = total_retur;

                this.Data = result.data;

                this.GridProps.dataSource = result.data.faktur;
                this.GridReturProps.dataSource = result.data.retur;
                this.GridPotonganPembelianProps.dataSource = result.data.potongan;

                setTimeout(() => {
                    window.print();
                }, 1500);
            })
    }


}
