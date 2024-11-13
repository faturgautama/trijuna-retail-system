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

    SelectedData: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _repackingService: RepackingService,
    ) {
        this.DashboardProps = {
            title: 'History repacking',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
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
                { field: 'status_repacking', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_repacking', headerName: 'TGL. REPACKING', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 170, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 170, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 300, sortable: true, resizable: true },
                { field: 'qty_repacking', headerName: 'QTY REPACKING', width: 170, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'hpp_avarage_repacking', headerName: 'HPP AVG REPACKING', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_hpp_avarage_repacking', headerName: 'TOTAL HPP AVG REPACKING', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_hpp_avarage_urai', headerName: 'TOTAL HPP AVG URAI', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
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
        if (args == 'add') {
            this._router.navigate(['inventory/repacking/input']);
        };

        if (args == 'print') {
            this._router.navigate([`inventory/repacking/print/${this.SelectedData.id_repacking}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`inventory/repacking/export-pdf/${this.SelectedData.id_repacking}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._repackingService
            .getAll(args)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['inventory/repacking/detail', args.id_repacking]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
