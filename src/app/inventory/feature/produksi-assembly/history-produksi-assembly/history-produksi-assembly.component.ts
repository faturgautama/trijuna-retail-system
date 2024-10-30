import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AssemblyService } from 'src/app/@core/service/inventory/assembly/assembly.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

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
        private _assemblyService: AssemblyService
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
                    id: 'mb.kode_barang',
                    title: 'Kode Barang',
                    type: 'string',
                    value: 'mb.kode_barang',
                },
                {
                    id: 'mb.barcode',
                    title: 'Barcode',
                    type: 'string',
                    value: 'mb.barcode',
                },
                {
                    id: 'mb.nama_barang',
                    title: 'Nama Barang',
                    type: 'string',
                    value: 'mb.nama_barang',
                },
                {
                    id: 'nomor_produksi',
                    title: 'No. Faktur',
                    type: 'string',
                    value: 'tp.nomor_produksi',
                },
                {
                    id: 'tanggal_produksi',
                    title: 'Tgl. Assembly',
                    type: 'date',
                    value: 'tp.tanggal_produksi',
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
                { field: 'nomor_produksi', headerName: 'NO. FAKTUR', width: 170, sortable: true, resizable: true },
                { field: 'status_produksi', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_produksi', headerName: 'TGL. ASSEMBLY', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 170, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 170, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 300, sortable: true, resizable: true },
                { field: 'qty_produksi', headerName: 'QTY ASSEMBLY', width: 170, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'hpp_avarage_produksi', headerName: 'HPP AVG ASSEMBLY', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_hpp_avarage_produksi', headerName: 'TOTAL HPP AVG ASSEMBLY', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_hpp_avarage_komponen', headerName: 'TOTAL HPP AVG KOMPONEN', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
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
        this._assemblyService
            .getAll(args)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['inventory/assembly/detail', args.id_produksi]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
