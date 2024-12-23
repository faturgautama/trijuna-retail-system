import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { MutasiMasukService } from 'src/app/@core/service/inventory/mutasi-masuk/mutasi-masuk.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { InputMutasiMasukComponent } from '../input-mutasi-masuk/input-mutasi-masuk.component';

@Component({
    selector: 'app-history-mutasi-masuk',
    templateUrl: './history-mutasi-masuk.component.html',
    styleUrls: ['./history-mutasi-masuk.component.scss']
})
export class HistoryMutasiMasukComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    @ViewChild('InputMutasiMasukComps') InputMutasiMasukComps!: InputMutasiMasukComponent

    SelectedData: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _mutasiMasukService: MutasiMasukService
    ) {
        this.DashboardProps = {
            title: 'History Mutasi Lokasi Masuk',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'warehouse_asal',
                    title: 'Warehouse Asal',
                    type: 'string',
                    value: 'tml.warehouse_asal',
                },
                {
                    id: 'warehouse_tujuan',
                    title: 'Warehouse Tujuan',
                    type: 'string',
                    value: 'tml.warehouse_tujuan',
                },
                {
                    id: 'tanggal_mutasi',
                    title: 'Tgl. Mutasi',
                    type: 'date',
                    value: 'tml.tanggal_mutasi_lokasi',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tml.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'nomor_mutasi_lokasi', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true, cellClass: 'text-red-600 font-semibold' },
                {
                    field: 'tanggal_mutasi_lokasi', headerName: 'TGL. MUTASI', width: 150, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'lokasi_asal', headerName: 'LOKASI ASAL', width: 200, sortable: true, resizable: true },
                { field: 'nama_warehouse_asal', headerName: 'WAREHOUSE ASAL', width: 200, sortable: true, resizable: true },
                { field: 'lokasi_tujuan', headerName: 'LOKASI TUJUAN', width: 200, sortable: true, resizable: true },
                { field: 'nama_warehouse_tujuan', headerName: 'WAREHOUSE TUJUAN', width: 200, sortable: true, resizable: true },
                {
                    field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true, cellClass: 'text-right',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                {
                    field: 'total_harga', headerName: 'GRAND TOTAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                { field: 'status_mutasi_lokasi', headerName: 'STATUS MUTASI', width: 240, sortable: true, resizable: true, cellClass: 'text-center' },
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

        this.InputMutasiMasukComps
            .UploadSuccess$
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result) {
                    this.handleSearchOffcanvas([]);
                }
            });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this.InputMutasiMasukComps.handleOpenDialog();
        };

        if (args == 'print') {
            this._router.navigate([`inventory/mutasi-masuk/print/${this.SelectedData.id_mutasi_lokasi}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`inventory/mutasi-masuk/export-pdf/${this.SelectedData.id_mutasi_lokasi}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._mutasiMasukService
            .getAll(args)
            .pipe(takeUntil(this.Destroy$))
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
        this._router.navigate(['inventory/mutasi-masuk/detail', args.id_mutasi_lokasi]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
