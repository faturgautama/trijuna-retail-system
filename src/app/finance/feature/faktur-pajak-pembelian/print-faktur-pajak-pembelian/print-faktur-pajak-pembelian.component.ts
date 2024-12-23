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
        private _authenticationService: AuthenticationService,
        private _fakturPajakPembelianService: FakturPajakPembelianService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'urut', headerName: 'No.', width: '5%' },
                { field: 'nama_barang', headerName: 'Macam Dan Jenis Barang Kena Pajak', width: '30%' },
                { field: 'qty', headerName: 'Quantity', class: 'text-end', format: 'number', width: '15%' },
                { field: 'harga_satuan', headerName: 'Harga Satuan menurut FP (Rp)', class: 'text-end', format: 'number', width: '25%' },
                { field: 'sub_total', headerName: 'Harga BPK yang dikembalikan', class: 'text-end', format: 'number', width: '25%' },
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
                let total_transaksi = 0;

                result.data.detail.forEach((item: any, index: number) => {
                    item.urut = index + 1;
                    item.sub_total = parseFloat(item.sub_total);
                    total_transaksi += item.sub_total;
                });

                result.data.total_transaksi = this._utilityService.FormatNumber(total_transaksi, '');
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                setTimeout(() => {
                    window.print();
                }, 2000);
            })
    }

}
