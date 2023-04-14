import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SettingHargaAction } from 'src/app/@shared/state/setup-data/setting-harga/setting-harga.action';

@Component({
    selector: 'app-list-setting-harga',
    templateUrl: './list-setting-harga.component.html',
    styleUrls: ['./list-setting-harga.component.scss']
})
export class ListSettingHargaComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Data Setting Harga',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'kode_barang',
                    title: 'Kode Barang',
                    type: 'string',
                    value: 'mb.kode_member',
                },
                {
                    id: 'nama_barang',
                    title: 'Nama Member',
                    type: 'string',
                    value: 'mb.nama_barang',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'id_setting_harga', headerName: 'ID SETTING HARGA', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'id_lokasi', headerName: 'ID LOKASI', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'nama_lokasi', headerName: 'LOKASI', width: 400, sortable: true, resizable: true },
                { field: 'tanggal_mulai_berlaku', headerName: 'TGL. BERLAKU', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU INPUT', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'updated_by', headerName: 'UPDATED BY', width: 150, sortable: true, resizable: true },
                { field: 'updated_at', headerName: 'WAKTU UPDATE', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        this._router.navigate(['setup-data/setting-harga/input']);
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new SettingHargaAction.GetAll(args))
            .subscribe((result) => {
                if (result.setting_harga.entities.success) {
                    this.GridProps.dataSource = result.setting_harga.entities.data;
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['setup-data/setting-harga/detail', args.id_setting_harga]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
