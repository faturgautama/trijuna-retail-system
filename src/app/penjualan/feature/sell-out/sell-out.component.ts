import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { PenjualanService } from 'src/app/@core/service/penjualan/penjualan/penjualan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupDivisiAction } from 'src/app/@shared/state/setup-data/setup-divisi';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-sell-out',
    templateUrl: './sell-out.component.html',
    styleUrls: ['./sell-out.component.scss']
})
export class SellOutComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;
    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    constructor(
        private _store: Store,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _penjualanService: PenjualanService,
    ) {
        this.DashboardProps = {
            title: 'History Sell Out Item',
            button_navigation: [
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'tanggal_pencarian',
                    title: 'Tgl. Pencarian',
                    type: 'date',
                    value: 'tanggal_pencarian',
                },
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
                    value: ' ms.id_supplier',
                    dropdown_props: []
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 150, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 200, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'divisi', headerName: 'DIVISI', width: 150, sortable: true, resizable: true },
                { field: 'group', headerName: 'GROUP', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'merk', headerName: 'MERK', width: 150, sortable: true, resizable: true },
                { field: 'qty_jual', headerName: 'QTY JUAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') } },
                { field: 'harga_jual', headerName: 'HARGA JUAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'harga_beli', headerName: 'HARGA BELI', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'subtotal', headerName: 'SUBTOTAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            // height: "100%",
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_pemesanan_po_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total',
                    label: 'Total',
                    status: 'readonly',
                    type: 'numeric',
                    required: true
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-1',
        };
    }

    ngOnInit(): void {
        this.getAllDivisi();
        this.getAllGroup();
        this.getAllSupplier();
        // this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'export_excel') {
            const dataSource = this.GridProps.dataSource.map((item) => {
                return {
                    kode_barang: item.kode_barang,
                    barcode: item.barcode,
                    nama_barang: item.nama_barang,
                    divisi: item.divisi,
                    group: item.group,
                    satuan: item.kode_satuan,
                    merk: item.merk,
                    qty_jual: (item.qty_jual),
                    harga_jual: (item.harga_jual),
                    subtotal: (item.subtotal),
                }
            });

            this._utilityService.exportToExcel({ worksheetName: 'Sell_Out_Item', dataSource: dataSource })
        };
    }

    private getAllDivisi() {
        this._store
            .dispatch(new SetupDivisiAction.GetAll())
            .subscribe((result) => {
                this.OffcanvasFilterProps.filter[4].dropdown_props = result.setup_divisi.entities.data.map((item: any) => {
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
                this.OffcanvasFilterProps.filter[5].dropdown_props = result.setup_group.entities.data.map((item: any) => {
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
                this.OffcanvasFilterProps.filter[6].dropdown_props = result.setup_supplier.entities.data.map((item: any) => {
                    return {
                        name: item.nama_supplier,
                        value: item.id_supplier
                    }
                });
            })
    }

    handleSearchOffcanvas(args: any): void {
        let queryParams = "";

        const filter = args.filter((item: any) => {
            if (item.column == 'tanggal_pencarian') {
                queryParams = `?start=${this._utilityService.FormatDate(new Date(item.value), 'yyyy-MM-DD')}&end=${this._utilityService.FormatDate(new Date(item.value2), 'yyyy-MM-DD')}`;
            }

            return item.column != "tanggal_pencarian"
        });

        if (queryParams) {
            this._penjualanService
                .getAllSellOut(queryParams, filter)
                .subscribe((result) => {
                    if (result.success) {
                        this.GridProps.dataSource = result.data;

                        let total = 0;

                        for (const item of this.GridProps.dataSource) {
                            item.subtotal = parseFloat(item.subtotal);
                            total += item.subtotal;
                        }

                        this.CustomFormFooter.handleSetFieldValue('total', total);
                    }
                })
        } else {
            this._messageService.clear();
            this._messageService.add({ severity: 'warn', summary: 'Oops', detail: 'Tanggal Pencarian Tidak Boleh Kosong' })
        }
    }

}
