import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { ReturPembelianAction } from 'src/app/@shared/state/pembelian/retur-pembelian';

@Component({
    selector: 'app-history-retur-pembelian',
    templateUrl: './history-retur-pembelian.component.html',
    styleUrls: ['./history-retur-pembelian.component.scss']
})
export class HistoryReturPembelianComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'History Retur Pembelian',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'nomor_retur_pembelian', headerName: 'NO. RETUR', width: 170, sortable: true, resizable: true },
                { field: 'status_retur', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_retur_pembelian', headerName: 'TGL. RETUR', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'JUMLAH ITEM', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'total_harga', headerName: 'SUBTOTAL ', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'created_by', headerName: 'USER INPUT', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
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
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        this._router.navigate(['pembelian/retur-pembelian/input']);
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new ReturPembelianAction.GetAll(args))
            .subscribe((result) => {
                if (result.retur_pembelian.entities.success) {
                    this.GridProps.dataSource = result.retur_pembelian.entities.data;
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['pembelian/retur-pembelian/detail', args.id_retur_pembelian]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
