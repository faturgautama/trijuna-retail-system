import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PenjualanService } from 'src/app/@core/service/penjualan/penjualan/penjualan.service';
import { RefundPenjualanService } from 'src/app/@core/service/penjualan/refund-penjualan/refund-penjualan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-refund-penjualan',
    templateUrl: './history-refund-penjualan.component.html',
    styleUrls: ['./history-refund-penjualan.component.scss']
})
export class HistoryRefundPenjualanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _penjualanService: PenjualanService,
        private _refundPenjualanService: RefundPenjualanService,
    ) {
        this.DashboardProps = {
            title: 'History Refund Penjualan',
            button_navigation: [],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nama_supplier',
                    title: 'Nama Supplier',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'nomor_pemesanan',
                    title: 'No. Pemesanan',
                    type: 'string',
                    value: 'tp.nomor_pemesanan',
                },
                {
                    id: 'tanggal_pemesanan',
                    title: 'Tgl. Pemesanan',
                    type: 'date',
                    value: 'tp.tanggal_pemesanan',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tp.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'no_retur_penjualan', headerName: 'NO. FAKTUR', flex: 170, sortable: true, resizable: true },
                { field: 'nama_kasir', headerName: 'NAMA KASIR', flex: 150, sortable: true, resizable: true },
                { field: 'tanggal_refund', headerName: 'TGL. REFUND', flex: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'keterangan', headerName: 'KETERANGAN', flex: 150, sortable: true, resizable: true },
                { field: 'total_refund', headerName: 'TOTAL REFUND', flex: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'created_at', headerName: 'WAKTU ENTRY', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
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
        this._refundPenjualanService
            .getAll(args)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['penjualan/refund-penjualan/detail', args.id_refund]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
