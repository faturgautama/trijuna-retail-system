import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PenjualanService } from 'src/app/@core/service/penjualan/penjualan/penjualan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-penjualan',
    templateUrl: './history-penjualan.component.html',
    styleUrls: ['./history-penjualan.component.scss']
})
export class HistoryPenjualanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _penjualanService: PenjualanService,
    ) {
        this.DashboardProps = {
            title: 'History Penjualan',
            button_navigation: [],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nama_member',
                    title: 'Nama Member',
                    type: 'string',
                    value: 'mm.nama_member',
                },
                {
                    id: 'No. Faktur',
                    title: 'No. Faktur',
                    type: 'string',
                    value: 'pp.no_faktur',
                },
                {
                    id: 'tanggal_penjualan',
                    title: 'Tgl. Penjualan',
                    type: 'date',
                    value: 'pp.tanggal_penjualan',
                },
                {
                    id: 'nama',
                    title: 'User Kasir',
                    type: 'string',
                    value: 'uk.nama',
                },
                {
                    id: 'created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'pp.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'nota_penjualan', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true },
                { field: 'status_pemesanan', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_penjualan', headerName: 'TGL. PENJUALAN', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'kode_member', headerName: 'KODE MEMBER', width: 150, sortable: true, resizable: true },
                { field: 'nama_member', headerName: 'NAMA MEMBER', width: 200, sortable: true, resizable: true },
                { field: 'total_diskon_dalam', headerName: 'TOTAL DISKON DALAM', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_transaksi', headerName: 'TOTAL TRANSAKSI', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'diskon_luar_persen', headerName: 'DISKON LUAR (%)', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'diskon_luar_nominal', headerName: 'DISKON LUAR (Rp. )', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'ongkos_kirim', headerName: 'ONGKOS KIRIm', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'pembulatan', headerName: 'PEMBULATAN', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_transaksi', headerName: 'TOTAL TRANSAKSI', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_bayar', headerName: 'TOTAL BAYAR', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'kembali', headerName: 'KEMBALI', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'biaya_bank', headerName: 'BIAYA BANK', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'is_using_voucher', headerName: 'PAKAI VOUCHER', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return e.value ? 'IYA' : 'TIDAK' } },
                { field: 'nama_kasir', headerName: 'NAMA KASIR', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value, 'DD-MM-yyyy HH:mm:ss') } },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleSearchOffcanvas(args: any): void {
        this._penjualanService
            .getAll(args)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['penjualan/transaksi-penjualan/detail', args.id_penjualan]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
