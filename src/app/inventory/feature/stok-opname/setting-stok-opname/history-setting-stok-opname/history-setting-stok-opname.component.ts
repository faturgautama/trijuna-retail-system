import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { SettingStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/setting-stok-opname.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-setting-stok-opname',
    templateUrl: './history-setting-stok-opname.component.html',
    styleUrls: ['./history-setting-stok-opname.component.scss']
})
export class HistorySettingStokOpnameComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    SelectedData: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _settingStokOpnameService: SettingStokOpnameService
    ) {
        this.DashboardProps = {
            title: 'History Setting Stok Opname',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                // { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                // { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nomor_stok_opname',
                    title: 'No. Stok Opname',
                    type: 'string',
                    value: 'nomor_stok_opname',
                },
                {
                    id: 'jenis_stok_opname',
                    title: 'Jenis Setting',
                    type: 'string',
                    value: 'jenis_stok_opname',
                },
                {
                    id: 'tanggal_setting_stok_opname',
                    title: 'Tgl. Setting',
                    type: 'date',
                    value: 'tanggal_setting_stok_opname',
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
                { field: 'nomor_stok_opname', headerName: 'NO. STOK OPNAME', flex: 170, sortable: true, resizable: true, cellClass: 'text-red-600 font-semibold' },
                {
                    field: 'tanggal_setting_stok_opname', headerName: 'TGL. SETTING STOK OPNAME', flex: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'jenis_stok_opname', headerName: 'JENIS STOK OPNAME', flex: 200, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'KETERANGAN', flex: 200, sortable: true, resizable: true },
                { field: 'status', headerName: 'STATUS', flex: 200, sortable: true, resizable: true },
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
            this._router.navigate(['inventory/setting-stok-opname/input']);
        };

        if (args == 'print') {
            this._router.navigate([`inventory/setting-stok-opname/print/${this.SelectedData.id_setting_stok_opname}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`inventory/setting-stok-opname/export-pdf/${this.SelectedData.id_setting_stok_opname}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._settingStokOpnameService
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
        this._router.navigate(['inventory/setting-stok-opname/detail', args.id_setting_stok_opname]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }


}
