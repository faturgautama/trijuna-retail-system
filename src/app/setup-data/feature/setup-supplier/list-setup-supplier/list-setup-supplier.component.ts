import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupMemberAction } from 'src/app/@shared/state/setup-data/setup-member';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-list-setup-supplier',
    templateUrl: './list-setup-supplier.component.html',
    styleUrls: ['./list-setup-supplier.component.scss']
})
export class ListSetupSupplierComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Supplier',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'kode_supplier',
                    title: 'Kode Supplier',
                    type: 'string',
                    value: 'ms.kode_supplier',
                },
                {
                    id: 'nama_supplier',
                    title: 'Nama Supplier',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'alamat',
                    title: 'Alamat Supplier',
                    type: 'string',
                    value: 'ms.alamat',
                },
                {
                    id: 'created_at',
                    title: 'Waktu Entry',
                    type: 'date',
                    value: 'ms.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 170, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'ALAMAT LENGKAP', width: 250, sortable: true, resizable: true },
                { field: 'kota', headerName: 'KOTA', width: 150, sortable: true, resizable: true },
                { field: 'kecamatan', headerName: 'KECAMATAN', width: 150, sortable: true, resizable: true },
                { field: 'kelurahan', headerName: 'KELURAHAN', width: 150, sortable: true, resizable: true },
                { field: 'no_handphone', headerName: 'NO. HANDPHONE', width: 170, sortable: true, resizable: true },
                { field: 'email', headerName: 'EMAIL', width: 170, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 170, sortable: true, resizable: true },
                { field: 'limit_hutang', headerName: 'LIMIT HUTANG', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                {
                    field: 'is_pkp', headerName: 'PKP', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) }
                },
                {
                    field: 'is_tanpa_po', headerName: 'TANPA PO', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) }
                },
                { field: 'created_by', headerName: 'CREATED BY', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "400px"
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        this._router.navigate(['setup-data/setup-supplier/input']);
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new SetupSupplierAction.GetAll(args))
            .subscribe((result) => {
                if (result.setup_supplier.entities.success) {
                    this.GridProps.dataSource = result.setup_supplier.entities.data;
                }
            })
    }
}
