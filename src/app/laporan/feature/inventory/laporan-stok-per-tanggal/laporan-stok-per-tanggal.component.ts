import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { LaporanInventoryService } from 'src/app/@core/service/laporan/laporan-inventory.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupDivisiAction, SetupDivisiState } from 'src/app/@shared/state/setup-data/setup-divisi';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-laporan-stok-per-tanggal',
    templateUrl: './laporan-stok-per-tanggal.component.html',
    styleUrls: ['./laporan-stok-per-tanggal.component.scss']
})
export class LaporanStokPerTanggalComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    constructor(
        private _store: Store,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _laporanInventoryService: LaporanInventoryService,
    ) {
        this.DashboardProps = {
            title: 'Laporan Stok Per Tanggal',
            button_navigation: [
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'id_barang', headerName: 'ID BARANG', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'divisi', headerName: 'DIVISI', width: 170, sortable: true, resizable: true },
                { field: 'group', headerName: 'GROUP', width: 200, sortable: true, resizable: true },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 170, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 300, sortable: true, resizable: true },
                { field: 'stok_toko', headerName: 'STOK TOKO', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'stok_gudang', headerName: 'STOK GUDANG', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 300, sortable: true, resizable: true },
                { field: 'persediaan', headerName: 'PERSEDIAAN', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'ukuran', headerName: 'UKURAN', width: 150, sortable: true, resizable: true, cellClass: 'text-right' },
                { field: 'warna', headerName: 'WARNA', width: 150, sortable: true, resizable: true, cellClass: 'text-right' },
                { field: 'berat', headerName: 'BERAT', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
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
                { field: 'is_active', headerName: 'IS ACTIVE', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU INPUT', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'updated_by', headerName: 'UPDATED BY', width: 150, sortable: true, resizable: true },
                { field: 'updated_at', headerName: 'WAKTU UPDATE', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 16rem)",
            showPaging: false,
        };

        this.FormInputHeader = {
            id: 'form_searching_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal',
                    label: 'Tanggal',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'id_barang',
                    label: 'Id Barang',
                    status: 'insert',
                    type: 'lookup',
                    lookup_props: {
                        id: 'lookupBarang',
                        title: 'Data Barang',
                        columns: [
                            { field: 'kode_barang', width: 250, headerName: 'KODE BARANG', sortable: true, resizable: true },
                            { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                            { field: 'barcode', width: 250, headerName: 'BARCODE', sortable: true, resizable: true },
                        ],
                        filter: [
                            { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                            { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                            { id: 'barcode', title: 'Barcode', type: 'contain', value: 'mb.barcode' },
                        ],
                        label: 'Barang',
                        selectedField: 'nama_barang',
                        selectedValue: 'id_barang',
                        url: `${environment.endpoint}/mutasi_warehouse/lookup_barang`,
                    },
                    required: false,
                },
                {
                    id: 'id_divisi',
                    label: 'Divisi',
                    status: 'insert',
                    type: 'select',
                    hidden: false,
                    select_props: [],
                    required: false,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3'
        }
    }

    ngOnInit(): void {
        // this.handleSearchOffcanvas([]);
        this.getAllDivisi();
    }

    private getAllDivisi() {
        this._store
            .dispatch(new SetupDivisiAction.GetAll())
            .pipe(
                map((result: any) => {
                    if (result.setup_divisi.entities.success) {
                        return result.setup_divisi.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result: any) => {
                const indexWarehouse = this.FormInputHeader.fields.findIndex((item) => {
                    return item.id == 'id_divisi'
                });

                const data = result.map((item: any) => {
                    return {
                        name: item.divisi,
                        value: item.id_divisi
                    }
                });

                this.FormInputHeader.fields[indexWarehouse].select_props = data;
            })
    }

    handleClickButtonNav(args: string): void {
        if (args == 'export_excel') {
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

            this._utilityService.exportToExcel({ worksheetName: 'Laporan Stok Barang Per Tanggal', dataSource: dataSource })
        };
    }

    handleSearchOffcanvas(): void {
        console.log("payload =>", this.CustomForm.CustomForms.value);

        let filter = [];

        if (this.CustomForm.CustomForms.value.id_barang) {
            filter.push({
                "column": "mb.id_barang",
                "filter": "equel",
                "value": this.CustomForm.CustomForms.value.id_barang,
                "value2": ""
            });
        };

        if (this.CustomForm.CustomForms.value.id_divisi) {
            filter.push({
                "column": "md.id_divisi",
                "filter": "equel",
                "value": this.CustomForm.CustomForms.value.id_divisi,
                "value2": ""
            });
        };

        if (this.CustomForm.CustomForms.value.tanggal) {
            const tanggal = this._utilityService.FormatDate(new Date(this.CustomForm.CustomForms.value.tanggal), 'yyyy-MM-dd')

            this._laporanInventoryService
                .getLaporanStokPerTanggal(tanggal, filter)
                .subscribe((result) => {
                    if (result.success) {
                        this.GridProps.dataSource = result.data;
                    }
                })
        } else {
            this._messageService.clear();
            this._messageService.add({ severity: 'warn', summary: 'Oops', detail: 'Tanggal Tidak Boleh Kosong' });
        }
    }

}
