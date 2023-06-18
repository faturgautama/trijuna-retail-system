import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-tutup-kasir',
    templateUrl: './history-tutup-kasir.component.html',
    styleUrls: ['./history-tutup-kasir.component.scss']
})
export class HistoryTutupKasirComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'History Tutup Kasir',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'warehouse_asal',
                    title: 'Nama Kasir',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'tanggal_mutasi',
                    title: 'Tgl. Buka Kasir',
                    type: 'date',
                    value: 'tp.tanggal_pemesanan',
                },
                {
                    id: 'tanggal_mutasi',
                    title: 'Tgl. Tutup Kasir',
                    type: 'date',
                    value: 'tp.tanggal_pemesanan',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'id_mutasi_warehouse', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true },
                {
                    field: 'tanggal_mutasi_warehouse', headerName: 'TGL. BUKA KASIR', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                {
                    field: 'tanggal_mutasi_warehouse', headerName: 'TGL. TUTUP KASIR', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'warehouse_asal', headerName: 'USER KASIR', width: 200, sortable: true, resizable: true },
                {
                    field: 'qty', headerName: 'JUMLAH MODAL', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                {
                    field: 'qty', headerName: 'JUMLAH PENDAPATAN', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                { field: 'status_mutasi_warehouse', headerName: 'STATUS', width: 120, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        this._router.navigate(['penjualan/tutup-kasir/input']);
    }

    handleSearchOffcanvas(args: any): void {
        // this._store.dispatch(new PemesananPoAction.GetAll(args))
        //     .subscribe((result) => {
        //         if (result.pemesanan_po.entities.success) {
        //             this.GridProps.dataSource = result.pemesanan_po.entities.data;
        //         }
        //     })
    }

    handleRowDoubleClicked(args: any): void {
        // this._router.navigate(['inventory/mutasi-lokasi/detail', args.id_mutasi]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
