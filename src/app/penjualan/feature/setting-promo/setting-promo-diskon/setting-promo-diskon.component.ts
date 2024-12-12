import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SettingPromoDiskonService } from 'src/app/@core/service/penjualan/setting-promo/setitng-promo-diskon/setting-promo-diskon.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SettingPromoDiskonBarangComponent } from './setting-promo-diskon-barang/setting-promo-diskon-barang.component';
import { SettingPromoDiskonMerkComponent } from './setting-promo-diskon-merk/setting-promo-diskon-merk.component';
import { SettingPromoDiskonSupplierComponent } from './setting-promo-diskon-supplier/setting-promo-diskon-supplier.component';

@Component({
    selector: 'app-setting-promo-diskon',
    templateUrl: './setting-promo-diskon.component.html',
    styleUrls: ['./setting-promo-diskon.component.scss']
})
export class SettingPromoDiskonComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    @ViewChild('SettingBarangComps') SettingBarangComps!: SettingPromoDiskonBarangComponent;

    @ViewChild('SettingMerkComps') SettingMerkComps!: SettingPromoDiskonMerkComponent;

    @ViewChild('SettingSupplierComps') SettingSupplierComps!: SettingPromoDiskonSupplierComponent;

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPromoDiskonService: SettingPromoDiskonService,
    ) {
        this.DashboardProps = {
            title: 'Setting Promo Diskon',
            button_navigation: [
                { id: 'delete', caption: 'Delete', icon: 'pi pi-trash text-xs' },
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'is_nominal', headerName: 'IS NOMINAL', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'kode_promo_diskon', headerName: 'KODE PROMO', width: 200, sortable: true, resizable: true },
                { field: 'nama_promo_diskon', headerName: 'NAMA PROMO', width: 350, sortable: true, resizable: true },
                { field: 'minimal_qty', headerName: 'MINIMAL QTY', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'diskon', headerName: 'DISKON', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'kuota', headerName: 'KUOTA', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'tanggal_mulai', headerName: 'TGL. MULAI', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'tanggal_berakhir', headerName: 'TGL. BERAKHIR', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_tampil_pos', headerName: 'IS TAMPIL POS', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'created_at', headerName: 'WAKTU INPUT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setting Promo Diskon',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_promo_diskon',
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
                        value: false,
                        validator: 'Is Nominal Tidak Boleh Kosong',
                    },
                    {
                        id: 'kode_promo_diskon',
                        label: 'Kode Promo',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Kode Promo Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_promo_diskon',
                        label: 'Nama Promo',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Nama Promo Tidak Boleh Kosong',
                    },
                    {
                        id: 'minimal_qty',
                        label: 'Minimal Qty',
                        status: 'insert',
                        type: 'numeric',
                        hidden: false,
                        required: true,
                        validator: 'Minimal Qty Tidak Boleh Kosong',
                    },
                    {
                        id: 'diskon',
                        label: 'Diskon',
                        status: 'insert',
                        type: 'numeric',
                        hidden: false,
                        required: true,
                        validator: 'Diskon Tidak Boleh Kosong',
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
                        id: 'is_tampil_pos',
                        label: 'Is Tampil POS',
                        status: 'insert',
                        type: 'radio',
                        radio_props: [
                            { id: 'is_tampil_pos_true', name: 'Ya', value: true },
                            { id: 'is_tampil_pos_false', name: 'Tidak', value: false },
                        ],
                        required: false,
                        value: true,
                        radio_initial_value: true,
                        validator: 'Is Tampil POS Tidak Boleh Kosong',
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
                        value: false,
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

                setTimeout(() => {
                    this.FormDialog.CustomForm.CustomForms.get('is_tampil_pos')?.setValue(true);
                }, 500);
                break;
            case 'delete':
                this._settingPromoDiskonService
                    .delete(this.SelectedData.id_promo_diskon)
                    .subscribe((result) => {
                        if (result.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });
                            this.SettingBarangComps.GridProps.dataSource = [];
                            this.SelectedData = null as any;
                            this.getAll();
                        }
                    });
                break;
            default:
                break;
        }
    }

    onCellClicked(args: any) {
        this.SelectedData = args;

        this.SettingBarangComps.id_promo_diskon = args.id_promo_diskon;
        this.SettingBarangComps.getDetailPromoDiskonBarang();

        this.SettingMerkComps.id_promo_diskon = args.id_promo_diskon;
        this.SettingMerkComps.getDetailPromoDiskonMerk();

        this.SettingSupplierComps.id_promo_diskon = args.id_promo_diskon;
        this.SettingSupplierComps.getDetailPromoDiskonSupplier();
    }

    onRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_promo_diskon: args.id_promo_diskon,
            is_nominal: args.is_nominal,
            kode_promo_diskon: args.kode_promo_diskon,
            nama_promo_diskon: args.nama_promo_diskon,
            minimal_qty: args.minimal_qty,
            diskon: args.diskon,
            kuota: args.kuota,
            tanggal_mulai: new Date(args.tanggal_mulai),
            tanggal_berakhir: new Date(args.tanggal_berakhir),
            gambar: args.gambar,
            is_active: args.is_active,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAll(): void {
        this._settingPromoDiskonService
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
                is_nominal: data.is_nominal ? data.is_nominal : false,
                kode_promo_diskon: data.kode_promo_diskon,
                nama_promo_diskon: data.nama_promo_diskon,
                minimal_qty: data.minimal_qty,
                diskon: data.diskon,
                kuota: data.kuota,
                tanggal_mulai: new Date(data.tanggal_mulai),
                tanggal_berakhir: new Date(data.tanggal_berakhir),
                gambar: data.gambar,
                is_active: data.is_active ? data.is_active : false,
            };

            this._settingPromoDiskonService
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
            this._settingPromoDiskonService
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
