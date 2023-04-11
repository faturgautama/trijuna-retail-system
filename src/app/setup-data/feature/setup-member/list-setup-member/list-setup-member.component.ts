import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupMemberAction } from 'src/app/@shared/state/setup-data/setup-member/setup-member.action';

@Component({
    selector: 'app-list-setup-member',
    templateUrl: './list-setup-member.component.html',
    styleUrls: ['./list-setup-member.component.scss']
})
export class ListSetupMemberComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Member',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'kode_member',
                    title: 'Kode Member',
                    type: 'string',
                    value: 'mm.kode_member',
                },
                {
                    id: 'nama_lengkap',
                    title: 'Nama Member',
                    type: 'string',
                    value: 'mm.nama_member',
                },
                {
                    id: 'alamat',
                    title: 'Alamat Member',
                    type: 'string',
                    value: 'mm.alamat',
                },
                {
                    id: 'waktu_entry',
                    title: 'Waktu Entry',
                    type: 'date',
                    value: 'mm.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'id_member', headerName: 'ID', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'kode_member', headerName: 'KODE MEMBER', width: 170, sortable: true, resizable: true },
                { field: 'nama_member', headerName: 'NAMA MEMBER', width: 200, sortable: true, resizable: true },
                { field: 'alamat', headerName: 'ALAMAT LENGKAP', width: 250, sortable: true, resizable: true },
                { field: 'kota', headerName: 'KOTA', width: 150, sortable: true, resizable: true },
                { field: 'kecamatan', headerName: 'KECAMATAN', width: 150, sortable: true, resizable: true },
                { field: 'kelurahan', headerName: 'KELURAHAN', width: 150, sortable: true, resizable: true },
                { field: 'email', headerName: 'EMAIL', width: 200, sortable: true, resizable: true },
                { field: 'jenis_kelamin', headerName: 'GENDER', width: 150, sortable: true, resizable: true },
                { field: 'pekerjaan', headerName: 'PEKERJAAN', width: 150, sortable: true, resizable: true },
                { field: 'no_handphone', headerName: 'NO. HANDPHONE', width: 170, sortable: true, resizable: true },
                { field: 'jenis_identitas', headerName: 'JENIS IDENTITAS', width: 200, sortable: true, resizable: true },
                { field: 'nomor_identitas', headerName: 'NO. IDENTITAS', width: 250, sortable: true, resizable: true },
                { field: 'tanggal_daftar', headerName: 'TGL. DAFTAR', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'sisa_piutang', headerName: 'SISA PIUTANG', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'jumlah_poin', headerName: 'JUMLAH POIN', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
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
        this._router.navigate(['setup-data/setup-member/input']);
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new SetupMemberAction.GetAll(args))
            .subscribe((result) => {
                if (result.setup_member.entities.success) {
                    this.GridProps.dataSource = result.setup_member.entities.data;
                }
            })
    }
}
