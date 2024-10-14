import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { TitipTagihanService } from 'src/app/@core/service/finance/titip-tagihan/titip-tagihan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PemesananPoAction } from 'src/app/@shared/state/pembelian/pemesanan-po';

@Component({
    selector: 'app-history-titip-tagihan',
    templateUrl: './history-titip-tagihan.component.html',
    styleUrls: ['./history-titip-tagihan.component.scss']
})
export class HistoryTitipTagihanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _titipTagihanService: TitipTagihanService,
    ) {
        this.DashboardProps = {
            title: 'History Titip Tagihan',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
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
                    id: 'nomor_pemesanan',
                    title: 'No. Pemesanan',
                    type: 'string',
                    value: 'tp.nomor_pemesanan',
                },
                {
                    id: 'no_nota',
                    title: 'No. Nota',
                    type: 'string',
                    value: 'tp.no_nota',
                },
                {
                    id: 'tanggal_nota',
                    title: 'Tgl. Nota',
                    type: 'date',
                    value: 'tp.tanggal_nota',
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
                { field: 'nomor_titip_tagihan', headerName: 'NO. TT', width: 170, sortable: true, resizable: true },
                { field: 'tanggal_titip_tagihan', headerName: 'TGL. TT', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 300, sortable: true, resizable: true },
                { field: 'tanggal_rencana_bayar', headerName: 'TGL. RENCANA BAYAR', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'total_titip_tagihan', headerName: 'TOTAL TT', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_potongan', headerName: 'TOTAL POTONGAN', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_retur', headerName: 'TOTAL RETUR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_bayar', headerName: 'TOTAL BAYAR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 170, sortable: true, resizable: true },
                { field: 'is_lunas', headerName: 'SUDAH LUNAS', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'tanggal_lunas', headerName: 'TGL. PELUNASAN', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
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
            this._router.navigate(['finance/titip-tagihan/input']);
        };

        if (args == 'print') {
            this._router.navigate([`finance/titip-tagihan/print/${this.SelectedData.id_bayar_hutang}`]);
        }
    }

    handleSearchOffcanvas(args: any): void {
        this._titipTagihanService
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
        this._router.navigate(['finance/titip-tagihan/detail', args.id_bayar_hutang]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
