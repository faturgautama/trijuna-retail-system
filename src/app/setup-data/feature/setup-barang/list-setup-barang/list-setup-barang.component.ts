import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangAction } from 'src/app/@shared/state/setup-data/setup-barang';
import { SetupDivisiAction } from 'src/app/@shared/state/setup-data/setup-divisi';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-list-setup-barang',
    templateUrl: './list-setup-barang.component.html',
    styleUrls: ['./list-setup-barang.component.scss']
})
export class ListSetupBarangComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    GridPenerimaanBarangProps: GridModel.IGrid;

    GridStokDanOmsetProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    IsAllBarang = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _setupBarangService: SetupBarangService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Barang',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.IsAllBarang = this._router.url.includes('all');

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'kode_barang',
                    title: 'Kode Barang',
                    type: 'string',
                    value: 'mb.kode_barang',
                },
                {
                    id: 'nama_barang',
                    title: 'Nama Barang',
                    type: 'string',
                    value: 'mb.nama_barang',
                },
                {
                    id: 'barcode',
                    title: 'Barcode',
                    type: 'string',
                    value: 'mb.barcode',
                },
                {
                    id: 'divisi',
                    title: 'Pilih Divisi',
                    type: 'dropdown',
                    value: 'mb.id_divisi',
                    dropdown_props: []
                },
                {
                    id: 'group',
                    title: 'Pilih Group',
                    type: 'dropdown',
                    value: ' mb.id_group',
                    dropdown_props: []
                },
                {
                    id: 'supplier',
                    title: 'Pilih Supplier',
                    type: 'dropdown',
                    value: 'mb.id_supplier',
                    dropdown_props: []
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
                { field: 'id_barang', headerName: 'ID BARANG', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'divisi', headerName: 'DIVISI', width: 170, sortable: true, resizable: true },
                { field: 'group', headerName: 'GROUP', width: 200, sortable: true, resizable: true },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 170, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 300, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 300, sortable: true, resizable: true },
                { field: 'persediaan', headerName: 'PERSEDIAAN', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'ukuran', headerName: 'UKURAN', width: 150, sortable: true, resizable: true, cellClass: 'text-right' },
                { field: 'warna', headerName: 'WARNA', width: 150, sortable: true, resizable: true, cellClass: 'text-right' },
                { field: 'berat', headerName: 'BERAT', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'draft_po', headerName: 'STOK REAL', width: 150, sortable: true, resizable: true, hide: !this.IsAllBarang },
                { field: 'harga_order', headerName: 'HARGA ORDER', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'harga_beli_terakhir', headerName: 'HARGA BELI TERAKHIR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'hpp_average', headerName: 'HPP AVERAGE', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'is_ppn', headerName: 'PPN', width: 100, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'nama_label', headerName: 'NAMA LABEL', width: 150, sortable: true, resizable: true, cellClass: 'text-left' },
                { field: 'margin', headerName: 'MARGIN', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'qty_grosir1', headerName: 'QTY GROSIR 1', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'harga_grosir1', headerName: 'HARGA GROSIR 1', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'qty_grosir2', headerName: 'QTY GROSIR 2', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'harga_grosir2', headerName: 'HARGA GROSIR 2', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'tahun_produksi', headerName: 'TAHUN PRODUKSI', width: 200, sortable: true, resizable: true, },
                { field: 'stok_min', headerName: 'STOK MIN', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'harga_jual', headerName: 'HARGA JUAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'stok_toko', headerName: 'STOK TOKO', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'stok_gudang', headerName: 'STOK GUDANG', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU INPUT', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'updated_by', headerName: 'UPDATED BY', width: 150, sortable: true, resizable: true },
                { field: 'updated_at', headerName: 'WAKTU UPDATE', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            showPaging: true,
        };

        this.GridPenerimaanBarangProps = {
            column: [
                { field: 'tanggal_nota', headerName: 'TGL. NOTA', flex: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'SUPPLIER', flex: 200, sortable: true, resizable: true },
                {
                    field: 'harga_beli', headerName: 'HARGA BELI', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                },
                {
                    field: 'qty', headerName: 'QTY', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                {
                    field: 'qty_bonus', headerName: 'QTY BONUS', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
            ],
            dataSource: [],
            height: "200px",
            toolbar: [],
            showPaging: false,
        };

        this.GridStokDanOmsetProps = {
            column: [
                {
                    field: 'tanggal', headerName: 'TANGGAL', flex: 150, sortable: true, resizable: true, editable: false,
                },
                {
                    field: 'qty', headerName: 'QTY', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                {
                    field: 'nominal', headerName: 'OMSET', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                },
            ],
            dataSource: [],
            height: "200px",
            toolbar: [],
            showPaging: false,
        };
    }

    ngOnInit(): void {
        this.getAllDivisi();
        this.getAllGroup();
        this.getAllSupplier();

        if (this.IsAllBarang) {
            this.GridProps.height = "calc(100vh - 14rem)";
            this.handleGetAllBarangNoLimit([]);
        } else {
            this.GridProps.height = "calc(100vh - 18rem)";
            this.handleSearchOffcanvas([]);
        }
    }

    private getAllDivisi() {
        this._store
            .dispatch(new SetupDivisiAction.GetAll())
            .subscribe((result) => {
                this.OffcanvasFilterProps.filter[3].dropdown_props = result.setup_divisi.entities.data.map((item: any) => {
                    return {
                        name: item.divisi,
                        value: item.id_divisi
                    }
                });
            })
    }

    private getAllGroup() {
        this._store
            .dispatch(new SetupGroupAction.GetAll())
            .subscribe((result) => {
                this.OffcanvasFilterProps.filter[4].dropdown_props = result.setup_group.entities.data.map((item: any) => {
                    return {
                        name: item.group,
                        value: item.id_group
                    }
                });
            })
    }

    private getAllSupplier() {
        this._store
            .dispatch(new SetupSupplierAction.GetAll([]))
            .subscribe((result) => {
                this.OffcanvasFilterProps.filter[5].dropdown_props = result.setup_supplier.entities.data.map((item: any) => {
                    return {
                        name: item.nama_supplier,
                        value: item.id_supplier
                    }
                });
            })
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this._router.navigate(['setup-data/setup-inventory/setup-barang/input']);
        };

        if (args == 'export_excel' && !this.IsAllBarang) {
            const dataSource = this.GridProps.dataSource.map((item) => {
                return {
                    kode_barang: item.kode_barang,
                    nama_barang: item.nama_barang,
                    barcode: item.barcode,
                    satuan: item.nama_satuan,
                    harga_jual: (item.harga_jual),
                    tanggal_dibuat: item.created_at,
                    nama_supplier: item.nama_supplier,
                    kode_supplier: item.kode_supplier,
                    stok_real: 0,
                    stok_toko: item.stok_toko,
                    stok_gudang: item.stok_gudang,
                }
            });

            this._utilityService.exportToExcel({ worksheetName: 'Master_Barang', dataSource: dataSource })
        };

        if (args == 'export_excel' && this.IsAllBarang) {
            const dataSource = this.GridProps.dataSource.map((item) => {
                return {
                    kode_barang: item.kode_barang,
                    nama_barang: item.nama_barang,
                    barcode: item.barcode,
                    satuan: item.nama_satuan,
                    harga_jual: (item.harga_jual),
                    tanggal_dibuat: item.created_at,
                    nama_supplier: item.nama_supplier,
                    kode_supplier: item.kode_supplier,
                    stok_real: 0,
                    stok_toko: item.stok_toko,
                    stok_gudang: item.stok_gudang,
                }
            });

            console.log("datasource =>", dataSource);

            this._utilityService.exportToExcel({ worksheetName: 'Master_Barang', dataSource: dataSource })
        };

        if (args == 'print') {
            this._router.navigate(['setup-data/setup-inventory/setup-barang/print']);
        }
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['setup-data/setup-inventory/setup-barang/detail/', args.id_barang])
    }

    handleCellClicked(args: any): void {
        this.getOmsetDanStokBarang(args.id_barang);
        this.getHistoryPenerimaanBarang(args.id_barang);
    }

    handleSearchOffcanvas(args: any): void {
        localStorage.setItem("_TRS_BRG_SEARCH_", JSON.stringify(args));

        if (this.IsAllBarang) {
            this.handleGetAllBarangNoLimit(args);
        } else {
            this._store
                .dispatch(new SetupBarangAction.GetAllBarang(args))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this.GridProps.dataSource = result.setup_barang.entities.data;
                    }
                })
        }
    }

    handleGetAllBarangNoLimit(args: any): void {
        localStorage.setItem("_TRS_BRG_SEARCH_", JSON.stringify(args));

        this._store
            .dispatch(new SetupBarangAction.GetAllBarangWithoutFilter(args))
            .subscribe((result) => {
                if (result.setup_barang.entities.success) {
                    this.GridProps.dataSource = result.setup_barang.entities.data;
                }
            })
    }

    private getHistoryPenerimaanBarang(id_barang: number) {
        this._setupBarangService
            .getHistoryPenerimaan(id_barang)
            .subscribe((result) => {
                this.GridPenerimaanBarangProps.dataSource = result.data;
            })
    }

    private getOmsetDanStokBarang(id_barang: number) {
        this._setupBarangService
            .getOmsetBarang(id_barang)
            .subscribe((result) => {
                this.GridStokDanOmsetProps.dataSource = result.data;
            })
    }
}
