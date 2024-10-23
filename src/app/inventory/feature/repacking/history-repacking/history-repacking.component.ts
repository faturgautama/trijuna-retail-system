import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RepackingService } from 'src/app/@core/service/inventory/repacking/repacking.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-repacking',
    templateUrl: './history-repacking.component.html',
    styleUrls: ['./history-repacking.component.scss']
})
export class HistoryRepackingComponent {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _repackingService: RepackingService,
    ) {
        this.DashboardProps = {
            title: 'History repacking',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'mb.kode_barang',
                    title: 'Kode Barang',
                    type: 'string',
                    value: 'mb.kode_barang',
                },
                {
                    id: 'mb.barcode',
                    title: 'Barcode',
                    type: 'string',
                    value: 'mb.barcode',
                },
                {
                    id: 'mb.nama_barang',
                    title: 'Nama Barang',
                    type: 'string',
                    value: 'mb.nama_barang',
                },
                {
                    id: 'nomor_repacking',
                    title: 'No. Faktur',
                    type: 'string',
                    value: 'tr.nomor_repacking',
                },
                {
                    id: 'tanggal_repacking',
                    title: 'Tgl. Repacking',
                    type: 'date',
                    value: 'tr.tanggal_repacking',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tr.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'nomor_repacking', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true },
                { field: 'status_pemesanan', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_pemesanan', headerName: 'TGL. REPACKING', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'NAM BARANG', width: 170, sortable: true, resizable: true },
                { field: 'qty', headerName: 'JUMLAH ITEM', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'created_by', headerName: 'USER INPUT', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
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
        this._router.navigate(['inventory/repacking/input']);
    }

    handleSearchOffcanvas(args: any): void {
        this._repackingService
            .getAll(args)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.pemesanan_po.entities.data;
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['inventory/repacking/detail', args.id_repacking]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
