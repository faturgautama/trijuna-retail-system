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
        // window.history.back();
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
                { field: 'nomor_penerimaan', headerName: 'No. Faktur Penerimaan', },
                { field: 'tanggal_nota', headerName: 'Tgl. Nota', },
                { field: 'created_at', headerName: 'Waktu Input', },
                { field: 'total_transaksi', headerName: 'Total Transaksi', class: 'text-end', format: 'currency' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };

        this.GridReturProps = {
            id: 'print-out-titip-tagihan',
            column: [
                { field: 'urut', headerName: 'No.', },
                { field: 'kode_barang', headerName: 'Kode Barang', },
                { field: 'barcode', headerName: 'Barcode', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'currency' },
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

        this.GridPotonganPembelianProps = {
            id: 'print-out-titip-tagihan',
            column: [
                { field: 'urut', headerName: 'No.', },
                { field: 'kode_barang', headerName: 'Kode Barang', },
                { field: 'barcode', headerName: 'Barcode', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'qty', headerName: 'Banyak', class: 'text-end', format: 'currency' },
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
        const id = this._activatedRoute.snapshot.params['id'];

        console.log("user =>", this.UserData);

        this._titipTagihanService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                // setTimeout(() => {
                //     window.print();
                // }, 1500);
            })
    }


}
