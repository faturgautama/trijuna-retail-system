import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SettingPromoBarangBarangComponent } from './setting-promo-barang-barang/setting-promo-barang-barang.component';
import { SettingPromoBonusBarangService } from 'src/app/@core/service/penjualan/setting-promo/setting-promo-bonus-barang/setting-promo-bonus-barang.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-setting-promo-barang',
    templateUrl: './setting-promo-barang.component.html',
    styleUrls: ['./setting-promo-barang.component.scss']
})
export class SettingPromoBarangComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    @ViewChild('SettingBarangComps') SettingBarangComps!: SettingPromoBarangBarangComponent;

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPromoBonusBarangService: SettingPromoBonusBarangService,
    ) {
        this.DashboardProps = {
            title: 'Setting Promo Bonus Barang',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'is_nominal', headerName: 'IS NOMINAL', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'kode_promo_bonus', headerName: 'KODE PROMO', width: 200, sortable: true, resizable: true },
                { field: 'nama_promo_bonus', headerName: 'NAMA PROMO', width: 350, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'BARANG', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'kuota', headerName: 'KUOTA', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'tanggal_mulai', headerName: 'TGL. MULAI', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'tanggal_berakhir', headerName: 'TGL. BERAKHIR', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'created_at', headerName: 'WAKTU INPUT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
            showPaging: false,
        };

        this.FormDialogProps = {
            title: 'Setting Promo Bonus Barang',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_promo_bonus',
                        label: 'Id Promo Diskon',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'is_nominal',
                        label: 'Is Nominal',
                        status: 'insert',
                        type: 'radio',
                        radio_props: [
                            { id: 'is_nominal_true', name: 'Ya', value: true },
                            { id: 'is_nominal_false', name: 'Tidak', value: false },
                        ],
                        required: true,
                        validator: 'Is Nominal Tidak Boleh Kosong',
                    },
                    {
                        id: 'kode_promo_bonus',
                        label: 'Kode Promo',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Kode Promo Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_promo_bonus',
                        label: 'Nama Promo',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Nama Promo Tidak Boleh Kosong',
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
                            ],
                            label: 'Barang',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang_no_limit/by_param`,
                            width: '70vw',
                        },
                        required: true,
                    },
                    {
                        id: 'kuota',
                        label: 'Kuota',
                        status: 'insert',
                        type: 'numeric',
                        hidden: false,
                        required: true,
                        validator: 'Kuota Tidak Boleh Kosong',
                    },
                    {
                        id: 'tanggal_mulai',
                        label: 'Tgl. Mulai',
                        status: 'insert',
                        type: 'date',
                        hidden: false,
                        required: true,
                        validator: 'Tgl. Mulai Tidak Boleh Kosong',
                    },
                    {
                        id: 'tanggal_berakhir',
                        label: 'Tgl. Berakhir',
                        status: 'insert',
                        type: 'date',
                        hidden: false,
                        required: true,
                        validator: 'Tgl. Berakhir Tidak Boleh Kosong',
                    },
                    {
                        id: 'gambar',
                        label: 'Gambar',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: false,
                    },
                    {
                        id: 'keterangan',
                        label: 'Keterangan',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: false,
                    },
                    {
                        id: 'is_active',
                        label: 'Is Active',
                        status: 'insert',
                        type: 'radio',
                        radio_props: [
                            { id: 'is_active_true', name: 'Ya', value: true },
                            { id: 'is_active_false', name: 'Tidak', value: false },
                        ],
                        required: true,
                        validator: 'Is Active Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-5 grid-cols-2'
            },
            width: '75vw'
        }
    }

    ngOnInit(): void {
        this.getAll();
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            default:
                break;
        }
    }

    onCellClicked(args: any) {
        this.SelectedData = args;

        this.SettingBarangComps.id_promo_bonus = args.id_promo_bonus;
        this.SettingBarangComps.getDetailPromoDiskonBarang();
    }

    onRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_promo_bonus: args.id_promo_bonus,
            is_nominal: args.is_nominal,
            kode_promo_bonus: args.kode_promo_bonus,
            nama_promo_bonus: args.nama_promo_bonus,
            id_barang: args.id_barang,
            keterangan: args.keterangan,
            kuota: args.diskon,
            tanggal_mulai: new Date(args.tanggal_mulai),
            tanggal_berakhir: new Date(args.tanggal_berakhir),
            gambar: args.gambar,
            is_active: args.is_active,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAll(): void {
        this._settingPromoBonusBarangService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: any = {
                is_nominal: data.is_nominal,
                kode_promo_bonus: data.kode_promo_bonus,
                nama_promo_bonus: data.nama_promo_bonus,
                id_barang: data.id_barang,
                keterangan: data.keterangan,
                kuota: data.diskon,
                tanggal_mulai: new Date(data.tanggal_mulai),
                tanggal_berakhir: new Date(data.tanggal_berakhir),
                gambar: data.gambar,
                is_active: data.is_active,
            };

            this._settingPromoBonusBarangService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAll();
                    }
                })
        } else {
            this._settingPromoBonusBarangService
                .update(data)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAll();
                    }
                })
        }
    }

}
