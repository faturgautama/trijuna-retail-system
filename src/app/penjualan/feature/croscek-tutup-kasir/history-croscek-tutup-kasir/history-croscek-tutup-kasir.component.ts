import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CroscekTutupKasirService } from 'src/app/@core/service/penjualan/croscek-tutup-kasir/croscek-tutup-kasir.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-croscek-tutup-kasir',
    templateUrl: './history-croscek-tutup-kasir.component.html',
    styleUrls: ['./history-croscek-tutup-kasir.component.scss']
})
export class HistoryCroscekTutupKasirComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    SelectedData: any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _croscekTutupKasir: CroscekTutupKasirService,
    ) {
        this.DashboardProps = {
            title: 'History Croscek Tutup Kasir',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nama',
                    title: 'Nama Kasir',
                    type: 'string',
                    value: 'uk.nama',
                },
                {
                    id: 'tanggal_tutup_kasir',
                    title: 'Tgl. Tutup Kasir',
                    type: 'date',
                    value: 'ptk.tanggal_tutup_kasir',
                },
                {
                    id: 'tanggal_kroscek_tutup_kasir',
                    title: 'Tgl. Croscek Tutup Kasir',
                    type: 'date',
                    value: 'pktk.tanggal_kroscek_tutup_kasiri',
                },
            ],
        }

        this.GridProps = {
            column: [
                {
                    field: 'tanggal_tutup_kasir', headerName: 'TGL. TUTUP KASIR', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                {
                    field: 'tanggal_kroscek_tutup_kasir', headerName: 'TGL. KROSCEK KASIR', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'kasir', headerName: 'USER KASIR', width: 150, sortable: true, resizable: true },
                {
                    field: 'pendapatan_versi_user', headerName: 'PENDAPATAN VERSI KASIR', width: 250, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'pendapatan_versi_system', headerName: 'PENDAPATAN VERSI KOMPUTER', width: 300, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'selisih', headerName: 'SELISIH', width: 250, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'refund', headerName: 'REFUND', width: 250, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'setor_bank', headerName: 'SETOR BANK', width: 250, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                { field: 'keterangan_tutup_kasir', headerName: 'KETERANGAN TUTUP KASIR', width: 200, sortable: true, resizable: true },
                { field: 'keterangan_kroscek', headerName: 'KETERANGAN KROSCEK', width: 200, sortable: true, resizable: true },
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
            this._router.navigate(['penjualan/croscek-tutup-kasir/input']);
        };

        if (args == 'print') {
            this._router.navigate([`penjualan/croscek-tutup-kasir/print/${this.SelectedData.id_kroscek_tutup_kasir}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._croscekTutupKasir
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
        this._router.navigate(['penjualan/croscek-tutup-kasir/detail', args.id_kroscek_tutup_kasir]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
