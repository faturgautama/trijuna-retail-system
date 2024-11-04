import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SettingPromoDiskonBarangService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon-barang.service';
import { SettingPromoBonusBarangBarangService } from 'src/app/@core/service/penjualan/setting-promo/setting-promo-bonus-barang/setting-promo-bonus-barang-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-setting-promo-barang-barang',
    templateUrl: './setting-promo-barang-barang.component.html',
    styleUrls: ['./setting-promo-barang-barang.component.scss']
})
export class SettingPromoBarangBarangComponent implements OnInit {

    @Input('id_promo_bonus') id_promo_bonus: any;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: any;

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPromoBonusBarangBarangService: SettingPromoBonusBarangBarangService,
    ) {
        this.GridProps = {
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', flex: 200, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', flex: 200, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 300, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: 'calc(100vh - 22rem)',
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.FormDialogProps = {
            title: 'Setting Promo Bonus Barang',
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
        }
    }

    ngOnInit(): void {
        // this.getDetailPromoDiskonBarang();
    }

    getDetailPromoDiskonBarang(): void {
        this._settingPromoBonusBarangBarangService
            .getAll(this.id_promo_bonus)
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;
            })

    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleToolbarClicked(args: GridModel.IGridToolbar): void {
        switch (args.id) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                this._settingPromoBonusBarangBarangService
                    .delete(this.SelectedData.id_promo_bonus_setting_barang)
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
            id_promo_bonus: this.id_promo_bonus,
            id_barang: args.id_barang,
        };

        this._settingPromoBonusBarangBarangService
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
