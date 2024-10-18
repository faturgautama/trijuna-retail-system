import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { InputStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/input-stok-opname.service';
import { SettingStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/setting-stok-opname.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-stok-opname',
    templateUrl: './history-stok-opname.component.html',
    styleUrls: ['./history-stok-opname.component.scss']
})
export class HistoryStokOpnameComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    SelectedData: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _inputStokOpnameService: InputStokOpnameService
    ) {
        this.DashboardProps = {
            title: 'History Stok Opname',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
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
                { field: 'keterangan', headerName: 'KETERANGAN', flex: 170, sortable: true, resizable: true, cellClass: 'text-red-600 font-semibold' },
                {
                    field: 'created_at', headerName: 'WAKTU INPUT', flex: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'nama', headerName: 'NAMA USER', flex: 200, sortable: true, resizable: true },
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
            this._router.navigate(['inventory/stok-opname/input']);
        };

        if (args == 'print') {
            this._router.navigate([`inventory/stok-opname/print/${this.SelectedData.id_input_stok_opname}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`inventory/stok-opname/export-pdf/${this.SelectedData.id_input_stok_opname}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._inputStokOpnameService
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
        this._router.navigate(['inventory/stok-opname/detail', args.id_input_stok_opname]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
