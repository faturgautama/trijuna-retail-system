import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SettingPromoHadiahService } from 'src/app/@core/service/penjualan/setting-promo/setting-promo-hadiah/setting-promo-hadiah.service';
import { SettingPromoHadiahBarangComponent } from './setting-promo-hadiah-barang/setting-promo-hadiah-barang.component';
import { SettingPromoHadiahMerkComponent } from './setting-promo-hadiah-merk/setting-promo-hadiah-merk.component';
import { SettingPromoHadiahSupplierComponent } from './setting-promo-hadiah-supplier/setting-promo-hadiah-supplier.component';

@Component({
    selector: 'app-setting-promo-hadiah',
    templateUrl: './setting-promo-hadiah.component.html',
    styleUrls: ['./setting-promo-hadiah.component.scss']
})
export class SettingPromoHadiahComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    @ViewChild('SettingBarangComps') SettingBarangComps!: SettingPromoHadiahBarangComponent;

    @ViewChild('SettingMerkComps') SettingMerkComps!: SettingPromoHadiahMerkComponent;

    @ViewChild('SettingSupplierComps') SettingSupplierComps!: SettingPromoHadiahSupplierComponent;

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPromoHadiahService: SettingPromoHadiahService,
    ) {
        this.DashboardProps = {
            title: 'Setting Promo Hadiah',
            button_navigation: [
                { id: 'delete', caption: 'Delete', icon: 'pi pi-trash text-xs' },
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'is_kelipatan', headerName: 'IS KELIPATAN', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
                { field: 'kode_promo_hadiah', headerName: 'KODE PROMO', width: 200, sortable: true, resizable: true },
                { field: 'nama_promo_hadiah', headerName: 'NAMA PROMO', width: 350, sortable: true, resizable: true },
                { field: 'nilai_promo_hadiah', headerName: 'NILAI PROMO', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'jumlah', headerName: 'JUMLAH', width: 250, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'hadiah', headerName: 'HADIAH', width: 250, sortable: true, resizable: true },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 250, sortable: true, resizable: true, },
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
            title: 'Setting Promo Hadiah',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_promo_hadiah',
                        label: 'Id Promo Hadiah',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'is_kelipatan',
                        label: 'Is Kelipatan',
                        status: 'insert',
                        type: 'radio',
                        radio_props: [
                            { id: 'is_kelipatan_true', name: 'Ya', value: true },
                            { id: 'is_kelipatan_false', name: 'Tidak', value: false },
                        ],
                        required: true,
                        value: false,
                        validator: 'Is Kelipatan Tidak Boleh Kosong',
                    },
                    {
                        id: 'kode_promo_hadiah',
                        label: 'Kode Promo',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Kode Promo Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_promo_hadiah',
                        label: 'Nama Promo',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Nama Promo Tidak Boleh Kosong',
                    },
                    {
                        id: 'nilai_promo_hadiah',
                        label: 'Nilai Promo',
                        status: 'insert',
                        type: 'numeric',
                        hidden: false,
                        required: true,
                        validator: 'Nilai Promo Tidak Boleh Kosong',
                    },
                    {
                        id: 'jumlah',
                        label: 'Jumlah',
                        status: 'insert',
                        type: 'numeric',
                        hidden: false,
                        required: true,
                        validator: 'Jumlah Tidak Boleh Kosong',
                    },
                    {
                        id: 'hadiah',
                        label: 'Hadiah',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Hadiah Tidak Boleh Kosong',
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
                custom_class: 'grid-rows-6 grid-cols-2'
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
                this._settingPromoHadiahService
                    .delete(this.SelectedData.id_promo_hadiah)
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

        this.SettingBarangComps.id_promo_hadiah = args.id_promo_hadiah;
        this.SettingBarangComps.getDetailPromoHadiahBarang();

        this.SettingMerkComps.id_promo_hadiah = args.id_promo_hadiah;
        this.SettingMerkComps.getDetailPromoHadiahMerk();

        this.SettingSupplierComps.id_promo_hadiah = args.id_promo_hadiah;
        this.SettingSupplierComps.getDetailPromoHadiahSupplier();
    }

    onRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_promo_hadiah: args.id_promo_hadiah,
            is_kelipatan: args.is_kelipatan,
            kode_promo_hadiah: args.kode_promo_hadiah,
            nama_promo_hadiah: args.nama_promo_hadiah,
            nilai_promo_hadiah: args.nilai_promo_hadiah,
            jumlah: args.jumlah,
            hadiah: args.hadiah,
            tanggal_mulai: new Date(args.tanggal_mulai),
            tanggal_berakhir: new Date(args.tanggal_berakhir),
            gambar: args.gambar,
            keterangan: args.keterangan,
            is_active: args.is_active,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAll(): void {
        this._settingPromoHadiahService
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
                is_kelipatan: data.is_kelipatan ? data.is_kelipatan : false,
                kode_promo_hadiah: data.kode_promo_hadiah,
                nama_promo_hadiah: data.nama_promo_hadiah,
                nilai_promo_hadiah: data.nilai_promo_hadiah,
                jumlah: data.jumlah,
                hadiah: data.hadiah,
                tanggal_mulai: new Date(data.tanggal_mulai),
                tanggal_berakhir: new Date(data.tanggal_berakhir),
                gambar: data.gambar,
                keterangan: data.keterangan,
                is_active: data.is_active ? data.is_active : false,
            };

            this._settingPromoHadiahService
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
            this._settingPromoHadiahService
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
