import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PemesananPoAction } from 'src/app/@shared/state/pembelian/pemesanan-po';

@Component({
    selector: 'app-history-produksi-assembly',
    templateUrl: './history-produksi-assembly.component.html',
    styleUrls: ['./history-produksi-assembly.component.scss']
})
export class HistoryProduksiAssemblyComponent {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'History Assembly',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nama_supplier',
                    title: 'Nama Barang',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'nomor_pemesanan',
                    title: 'No. Faktur',
                    type: 'string',
                    value: 'tp.nomor_pemesanan',
                },
                {
                    id: 'tanggal_pemesanan',
                    title: 'Tgl. Assembly',
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
                { field: 'nomor_pemesanan', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true },
                { field: 'status_pemesanan', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_pemesanan', headerName: 'TGL. ASSEMBLY', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'NAM BARANG', width: 170, sortable: true, resizable: true },
                { field: 'qty', headerName: 'JUMLAH ITEM', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
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
        this._router.navigate(['inventory/assembly/input']);
    }

    handleSearchOffcanvas(args: any): void {
        // this._store.dispatch(new PemesananPoAction.GetAll(args))
        //     .subscribe((result) => {
        //         if (result.pemesanan_po.entities.success) {
        //             this.GridProps.dataSource = result.pemesanan_po.entities.data;
        //         }
        //     })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['inventory/assembly/detail', args.id_pemesanan]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
