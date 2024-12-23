import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { MutasiWarehouseService } from 'src/app/@core/service/inventory/mutasi-warehouse/mutasi-warehouse.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-mutasi-warehouse',
    templateUrl: './history-mutasi-warehouse.component.html',
    styleUrls: ['./history-mutasi-warehouse.component.scss']
})
export class HistoryMutasiWarehouseComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    SelectedData: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _mutasiWarehouseService: MutasiWarehouseService,
    ) {
        this.DashboardProps = {
            title: 'History Mutasi Warehouse',
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
                { field: 'nomor_mutasi', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true, cellClass: 'text-red-600 font-semibold' },
                {
                    field: 'tanggal_mutasi_warehouse', headerName: 'TGL. MUTASI', width: 150, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'nama_warehouse_asal', headerName: 'WAREHOUSE ASAL', width: 200, sortable: true, resizable: true },
                { field: 'nama_warehouse_tujuan', headerName: 'WAREHOUSE TUJUAN', width: 200, sortable: true, resizable: true },
                {
                    field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true, cellClass: 'text-right',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                {
                    field: 'total_harga', headerName: 'GRAND TOTAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) }
                },
                { field: 'status_mutasi_warehouse', headerName: 'STATUS MUTASI', width: 240, sortable: true, resizable: true, cellClass: 'text-center' },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this._router.navigate(['inventory/mutasi-warehouse/input']);
        };

        if (args == 'print') {
            this._router.navigate([`inventory/mutasi-warehouse/print/${this.SelectedData.id_mutasi_warehouse}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`inventory/mutasi-warehouse/export-pdf/${this.SelectedData.id_mutasi_warehouse}`]);
        };

        if (args == 'input_ulang') {
            this._router.navigate([`inventory/mutasi-warehouse/input-ulang/${this.SelectedData.id_mutasi_warehouse}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._mutasiWarehouseService
            .getAll(args)
            .pipe(takeUntil(this.Destroy$))
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data
                }
            })
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;

        if (args.status_mutasi_warehouse == 'CANCEL') {
            this.DashboardProps = {
                title: 'History Mutasi Warehouse',
                button_navigation: [
                    { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                    { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                    { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
                    { id: 'input_ulang', caption: 'Input Ulang', icon: 'pi pi-pencil text-xs' },
                ],
            };
        } else {
            this.DashboardProps = {
                title: 'History Mutasi Warehouse',
                button_navigation: [
                    { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                    { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                    { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },

                ],
            };
        }
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['inventory/mutasi-warehouse/detail', args.id_mutasi_warehouse]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
