import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-mutasi-lokasi',
    templateUrl: './history-mutasi-lokasi.component.html',
    styleUrls: ['./history-mutasi-lokasi.component.scss']
})
export class HistoryMutasiLokasiComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'History Mutasi Lokasi',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'warehouse_asal',
                    title: 'Warehouse Asal',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'warehouse_tujuan',
                    title: 'Warehouse Tujuan',
                    type: 'string',
                    value: 'tp.nomor_pemesanan',
                },
                {
                    id: 'tanggal_mutasi',
                    title: 'Tgl. Mutasi',
                    type: 'date',
                    value: 'tp.tanggal_pemesanan',
                },
                {
                    id: 'tanggal_validasi',
                    title: 'Tgl. Validasi',
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
                { field: 'id_mutasi_warehouse', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true },
                {
                    field: 'tanggal_mutasi_warehouse', headerName: 'TGL. MUTASI', width: 150, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'warehouse_asal', headerName: 'WAREHOUSE ASAL', width: 200, sortable: true, resizable: true },
                { field: 'warehouse_tujuan', headerName: 'WAREHOUSE TUJUAN', width: 200, sortable: true, resizable: true },
                {
                    field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                {
                    field: 'total_harga', headerName: 'GRAND TOTAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                { field: 'status_mutasi_warehouse', headerName: 'STATUS MUTASI', width: 240, sortable: true, resizable: true },
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
        this._router.navigate(['inventory/mutasi-lokasi/input']);
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
        this._router.navigate(['inventory/mutasi-lokasi/detail', args.id_mutasi]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
