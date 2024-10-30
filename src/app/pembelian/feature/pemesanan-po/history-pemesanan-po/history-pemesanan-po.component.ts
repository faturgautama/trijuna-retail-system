import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PemesananPoAction } from 'src/app/@shared/state/pembelian/pemesanan-po';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-history-pemesanan-po',
    templateUrl: './history-pemesanan-po.component.html',
    styleUrls: ['./history-pemesanan-po.component.scss']
})
export class HistoryPemesananPoComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'History Pemesanan PO',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'supplier',
                    title: 'Pilih Supplier',
                    type: 'dropdown',
                    value: 'tp.id_supplier',
                    dropdown_props: []
                },
                {
                    id: 'nomor_pemesanan',
                    title: 'No. Pemesanan',
                    type: 'string',
                    value: 'tp.nomor_pemesanan',
                },
                {
                    id: 'tanggal_pemesanan',
                    title: 'Tgl. Pemesanan',
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
                { field: 'tangal_expired_pemesanan', headerName: 'TGL. EXP PO', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'tanggal_pemesanan', headerName: 'TGL. PEMESANAN', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'tanggal_kirim', headerName: 'TGL. KIRIM', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'nama_lokasi', headerName: 'LOKASI KIRIM', width: 200, sortable: true, resizable: true },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 170, sortable: true, resizable: true },
                { field: 'qty', headerName: 'JUMLAH ITEM', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'sub_total1', headerName: 'SUBTOTAL 1', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'diskon_persen', headerName: 'DISKON (%)', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'diskon_nominal', headerName: 'DISKON (Rp. )', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'sub_total2', headerName: 'SUBTOTAL 2', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'ppn_nominal', headerName: 'PPn', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_transaksi', headerName: 'TOTAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
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
        this.getAllSupplier();
    }

    private getAllSupplier() {
        this._store
            .dispatch(new SetupSupplierAction.GetAll([]))
            .subscribe((result) => {
                this.OffcanvasFilterProps.filter[0].dropdown_props = result.setup_supplier.entities.data.map((item: any) => {
                    return {
                        name: item.nama_supplier,
                        value: item.id_supplier
                    }
                });
            })
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this._router.navigate(['pembelian/pemesanan-po/input']);
        };

        if (args == 'print') {
            this._router.navigate([`pembelian/pemesanan-po/print/${this.SelectedData.id_pemesanan}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`pembelian/pemesanan-po/export-pdf/${this.SelectedData.id_pemesanan}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new PemesananPoAction.GetAll(args))
            .subscribe((result) => {
                if (result.pemesanan_po.entities.success) {
                    this.GridProps.dataSource = result.pemesanan_po.entities.data;
                }
            })
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['pembelian/pemesanan-po/detail', args.id_pemesanan]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
