import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { PelunasanHutangSupplierService } from 'src/app/@core/service/finance/pelunasan-hutang-supplier/pelunasan-hutang-supplier.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PemesananPoAction } from 'src/app/@shared/state/pembelian/pemesanan-po';

@Component({
    selector: 'app-history-pelunasan-tt',
    templateUrl: './history-pelunasan-tt.component.html',
    styleUrls: ['./history-pelunasan-tt.component.scss']
})
export class HistoryPelunasanTtComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _pelunasanHutangSupplierService: PelunasanHutangSupplierService,
    ) {
        this.DashboardProps = {
            title: 'History Pelunasan TT Supplier',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                // { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nama_supplier',
                    title: 'Nama Supplier',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'nomor_titip_tagihan',
                    title: 'No. TT',
                    type: 'string',
                    value: 'tbh.nomor_titip_tagihan',
                },
                {
                    id: 'nomor_pelunasan',
                    title: 'No. Faktur Pelunasan',
                    type: 'string',
                    value: 'tbhp.nomor_pelunasan',
                },
                {
                    id: 'tanggal_bayar',
                    title: 'Tgl. Bayar',
                    type: 'date',
                    value: 'tbhp.tanggal_bayar',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tbhp.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'nomor_titip_tagihan', headerName: 'NO. TT', flex: 170, sortable: true, resizable: true },
                { field: 'nomor_pelunasan', headerName: 'NO. FAKTUR', flex: 170, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'SUPPLIER', flex: 170, sortable: true, resizable: true },
                { field: 'tanggal_bayar', headerName: 'TGL. BAYAR', flex: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'jumlah_bayar', headerName: 'JUMLAH BAYAR', flex: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'created_by', headerName: 'USER INPUT', flex: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
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
            this._router.navigate(['finance/pelunasan-hutang-supplier/input']);
        };

        if (args == 'print') {
            this._router.navigate([`finance/pelunasan-hutang-supplier/print/${this.SelectedData.id_bayar_hutang_pelunasan}`]);
        }
    }

    handleSearchOffcanvas(args: any): void {
        this._pelunasanHutangSupplierService
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
        this._router.navigate(['finance/pelunasan-hutang-supplier/detail', args.id_bayar_hutang_pelunasan]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
