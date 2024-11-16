import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PembelianTanpaPoAction } from 'src/app/@shared/state/pembelian/pembelian-tanpa-po';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-history-penerimaan-tanpa-po',
    templateUrl: './history-penerimaan-tanpa-po.component.html',
    styleUrls: ['./history-penerimaan-tanpa-po.component.scss']
})
export class HistoryPenerimaanTanpaPoComponent implements OnInit {

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
            title: 'History Penerimaan Tanpa PO',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                // { field: 'nomor_pemesanan', headerName: 'NO. PEMESANAN', width: 170, sortable: true, resizable: true },
                { field: 'nomor_penerimaan', headerName: 'NO. PENERIMAAN', width: 170, sortable: true, resizable: true },
                { field: 'status_penerimaan', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'no_nota', headerName: 'NO. NOTA', width: 170, sortable: true, resizable: true },
                { field: 'tanggal_nota', headerName: 'TGL. NOTA', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
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
            this._router.navigate(['pembelian/penerimaan-tanpa-po/input']);
        };

        if (args == 'print') {
            this._router.navigate([`pembelian/penerimaan-tanpa-po/print/${this.SelectedData.id_penerimaan}`]);
        };

        if (args == 'export_pdf') {
            this._router.navigate([`pembelian/penerimaan-tanpa-po/export-pdf/${this.SelectedData.id_penerimaan}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new PembelianTanpaPoAction.GetAll(args))
            .subscribe((result) => {
                if (result.pembelian_tanpa_po.entities.success) {
                    this.GridProps.dataSource = result.pembelian_tanpa_po.entities.data;
                }
            })
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['pembelian/penerimaan-tanpa-po/detail', args.id_penerimaan]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }
}
