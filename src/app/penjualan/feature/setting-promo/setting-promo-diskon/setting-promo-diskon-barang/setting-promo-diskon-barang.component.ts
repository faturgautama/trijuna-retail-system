import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SettingPromoDiskonBarangService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon-barang.service';
import { SettingPromoDiskonMerkService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon-merk.service';
import { SettingPromoDiskonSupplierService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon-supplier.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupMerkAction } from 'src/app/@shared/state/setup-data/setup-merk';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-setting-promo-diskon-barang',
    templateUrl: './setting-promo-diskon-barang.component.html',
    styleUrls: ['./setting-promo-diskon-barang.component.scss']
})
export class SettingPromoDiskonBarangComponent implements OnInit {

    @Input('id_promo_diskon') id_promo_diskon: any;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    @ViewChild('FormDialogMerk') FormDialogMerk!: FormDialogComponent;
    FormDialogMerkProps: DialogModel.IFormDialog;

    @ViewChild('FormDialogSupplier') FormDialogSupplier!: FormDialogComponent;
    FormDialogSupplierProps: DialogModel.IFormDialog;

    SelectedData: any;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPromoDiskonMerkService: SettingPromoDiskonMerkService,
        private _settingPromoDiskonBarangService: SettingPromoDiskonBarangService,
        private _settingPromoDiskonSupplierService: SettingPromoDiskonSupplierService,
    ) {
        this.GridProps = {
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 200, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 200, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 300, sortable: true, resizable: true },
                { field: 'merk', headerName: 'MERK', width: 200, sortable: true, resizable: true },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 300, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: 'calc(100vh - 22rem)',
            toolbar: ['Add Barang', 'Add Supplier', 'Add Merk', 'Delete'],
            showPaging: false,
        };

        this.FormDialogProps = {
            title: 'Setting Promo Diskon Barang',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang',
                        label: 'Id Barang',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupBarang',
                            title: 'Data Barang',
                            columns: [
                                { field: 'kode_barang', width: 150, headerName: 'KODE BARANG', sortable: true, resizable: true },
                                { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                                { field: 'barcode', width: 200, headerName: 'BARCODE', sortable: true, resizable: true },
                                {
                                    field: 'harga_beli_terakhir', width: 250, headerName: 'HARGA BELI TERAKHIR', sortable: true, resizable: true,
                                    cellClass: 'text-end',
                                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e }
                                },
                                { field: 'nama_supplier', width: 250, headerName: 'SUPPLIER', sortable: true, resizable: true },
                                {
                                    field: 'stok_gudang', width: 150, headerName: 'STOK GUDANG', sortable: true, resizable: true,
                                    cellClass: 'text-center',
                                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e }
                                },
                                {
                                    field: 'stok_toko', width: 150, headerName: 'STOK TOKO', sortable: true, resizable: true,
                                    cellClass: 'text-center',
                                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e }
                                },
                            ],
                            filter: [
                                { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                                { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                                { id: 'barcode', title: 'Barcode', type: 'contain', value: 'mb.barcode' },
                            ],
                            label: 'Barang',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang_no_limit/by_param`,
                            width: '70vw',
                        },
                        lookup_set_value_field: ['barcode', 'nama_barang'],
                        required: true,
                    },
                    {
                        id: 'barcode',
                        label: 'Barcode',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                    },
                    {
                        id: 'nama_barang',
                        label: 'Nama Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-3'
            }
        };

        this.FormDialogMerkProps = {
            title: 'Setting Promo Diskon Merk',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'id_merk',
                        label: 'Merk',
                        status: 'insert',
                        type: 'select',
                        select_props: [],
                        required: false,
                    },
                ],
                custom_class: 'grid-rows-1'
            }
        };

        this.FormDialogSupplierProps = {
            title: 'Setting Promo Diskon Supplier',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_supplier',
                is_inline: true,
                fields: [
                    {
                        id: 'id_supplier',
                        label: 'Supplier',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupSupplier',
                            title: 'Data Supplier',
                            columns: [
                                { field: 'kode_supplier', flex: 340, headerName: 'KODE SUPPLIER', sortable: true, resizable: true },
                                { field: 'nama_supplier', flex: 340, headerName: 'NAMA SUPPLIER', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_supplier', title: 'Kode Supplier', type: 'contain', value: 'ms.kode_supplier' },
                                { id: 'nama_supplier', title: 'Nama Supplier', type: 'contain', value: 'ms.nama_supplier' },
                            ],
                            label: 'Pilih Supplier',
                            selectedField: 'nama_supplier',
                            selectedValue: 'id_supplier',
                            url: `${environment.endpoint}/supplier/by_param`
                        },
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-1'
            }
        }
    }

    ngOnInit(): void {
        // this.getDetailPromoDiskonBarang();

        // ** Merk
        const indexMerk = this.FormDialogMerkProps.form_props.fields.findIndex((item) => { return item.id == 'id_merk' });

        this._store.dispatch(new SetupMerkAction.GetAll())
            .subscribe((result) => {
                if (result.setup_merk.entities.success) {
                    this.FormDialogProps.form_props.fields[indexMerk].select_props = result.setup_merk.entities.data.map((item: any) => {
                        return { name: item.merk, value: item.id_merk }
                    });
                }
            })
    }

    getDetailPromoDiskonBarang(): void {
        this._settingPromoDiskonBarangService
            .getAll(this.id_promo_diskon)
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;
            })

    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleToolbarClicked(args: GridModel.IGridToolbar): void {
        switch (args.id) {
            case 'add barang':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'add supplier':
                this.FormDialogSupplierProps.type = 'add';
                this.FormDialogSupplier.onOpenFormDialog();
                break;
            case 'add merk':
                this.FormDialogMerkProps.type = 'add';
                this.FormDialogMerk.onOpenFormDialog();
                break;
            case 'delete':
                this._settingPromoDiskonBarangService
                    .delete(this.SelectedData.id_promo_diskon_setting_barang)
                    .subscribe((result) => {
                        if (result.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            setTimeout(() => {
                                this.getDetailPromoDiskonBarang();
                            }, 1500);
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(args: any): void {
        const payload = {
            id_promo_diskon: this.id_promo_diskon,
            id_barang: args.id_barang,
        };

        this._settingPromoDiskonBarangService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();
                    this.getDetailPromoDiskonBarang();
                }
            })
    }

    handleSubmitFormMerk(args: any): void {
        const payload = {
            id_promo_diskon: this.id_promo_diskon,
            id_merk: args.id_merk,
        };

        this._settingPromoDiskonMerkService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();
                    this.getDetailPromoDiskonBarang();
                }
            })
    }

    handleSubmitFormSupplier(args: any): void {
        const payload = {
            id_promo_diskon: this.id_promo_diskon,
            id_supplier: args.id_supplier,
        };

        this._settingPromoDiskonSupplierService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();
                    this.getDetailPromoDiskonBarang();
                }
            })
    }
}
