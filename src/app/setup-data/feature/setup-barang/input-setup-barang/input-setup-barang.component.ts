import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { SetupBarangAction } from 'src/app/@shared/state/setup-data/setup-barang';
import { SetupDivisiAction } from 'src/app/@shared/state/setup-data/setup-divisi';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';
import { SetupMerkAction } from 'src/app/@shared/state/setup-data/setup-merk';
import { SetupSatuanAction } from 'src/app/@shared/state/setup-data/setup-satuan';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-setup-barang',
    templateUrl: './input-setup-barang.component.html',
    styleUrls: ['./input-setup-barang.component.scss']
})
export class InputSetupBarangComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    FormInput: CustomFormModel.IForm;

    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
    ) {
        this.FormInput = {
            id: 'input_setup_barang',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_divisi',
                    label: 'Divisi',
                    status: 'insert',
                    type: 'select',
                    required: true,
                    validator: 'Divisi Tidak Boleh Kosong',
                    select_props: [],
                },
                {
                    id: 'id_group',
                    label: 'Group',
                    status: 'insert',
                    type: 'select',
                    required: true,
                    validator: 'Group Tidak Boleh Kosong',
                    select_props: []
                },
                {
                    id: 'kode_barang',
                    label: 'Kode Barang',
                    status: 'insert',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama_barang',
                    label: 'Nama Barang',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    validator: 'Nama Barang Tidak Boleh Kosong',
                },
                {
                    id: 'barcode',
                    label: 'Barcode',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    validator: 'Barcode Tidak Boleh Kosong',
                },
                {
                    id: 'barcodebysystem',
                    label: 'Barcode By System',
                    status: 'insert',
                    type: 'radio',
                    radio_props: [
                        { id: 'barcodebysystem_true', name: 'Ya', value: true },
                        { id: 'barcodebysystem_false', name: 'Tidak', value: false },
                    ],
                    required: true,
                    validator: 'Barcode By System Tidak Boleh Kosong',
                    radio_initial_value: false,
                    radio_callback: (data) => {
                        const barcodeIndex = this.FormInput.fields.findIndex(item => item.id == 'barcode');
                        if (data) {
                            this.FormInput.fields[barcodeIndex].status = 'readonly';
                            this.CustomForm.CustomForms.get('barcode')?.setValue("");
                        } else {
                            this.FormInput.fields[barcodeIndex].status = 'insert';
                        }
                    },
                },
                {
                    id: 'persediaan',
                    label: 'Persediaan',
                    status: 'insert',
                    type: 'select',
                    required: true,
                    select_props: [
                        { id: 'persediaan_general', name: 'General', value: 'general' },
                        { id: 'persediaan_konsinyasi', name: 'Konsinyasi', value: 'konsinyasi' },
                    ],
                    validator: 'Persediaan Tidak Boleh Kosong',
                },
                {
                    id: 'id_merk',
                    label: 'Merk',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: false,
                },
                {
                    id: 'ukuran',
                    label: 'Ukuran',
                    status: 'insert',
                    type: 'string',
                    required: false,
                    validator: 'Ukuran Tidak Boleh Kosong',
                },
                {
                    id: 'warna',
                    label: 'Warna',
                    status: 'insert',
                    type: 'string',
                    required: false,
                    validator: 'Warna Tidak Boleh Kosong',
                },
                {
                    id: 'berat',
                    label: 'Berat',
                    status: 'insert',
                    type: 'numeric',
                    required: false,
                    validator: 'Berat Tidak Boleh Kosong',
                },
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
                {
                    id: 'harga_order',
                    label: 'Harga Order',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Harga Order Tidak Boleh Kosong',
                },
                {
                    id: 'harga_beli_terakhir',
                    label: 'Harga Beli Terakhir',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Harga Beli Terakhir Tidak Boleh Kosong',
                },
                {
                    id: 'hpp_average',
                    label: 'HPP Average',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'HPP Average Tidak Boleh Kosong',
                },
                {
                    id: 'is_ppn',
                    label: 'PPn',
                    status: 'insert',
                    type: 'radio',
                    radio_props: [
                        { id: 'ppn_true', name: 'Ya', value: true },
                        { id: 'ppn_false', name: 'Tidak', value: false },
                    ],
                    radio_initial_value: true,
                    required: true,
                    validator: 'PPn Tidak Boleh Kosong',
                },
                {
                    id: 'nama_label',
                    label: 'Nama Label',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    validator: 'Nama Label Tidak Boleh Kosong',
                },
                {
                    id: 'id_satuan',
                    label: 'Satuan 1',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                },
                {
                    id: 'isi',
                    label: 'Isi Satuan 1',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'id_satuan2',
                    label: 'Satuan 2',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: false,
                },
                {
                    id: 'isi_satuan2',
                    label: 'Isi Satuan 2',
                    status: 'insert',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'id_satuan3',
                    label: 'Satuan 3',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: false,
                },
                {
                    id: 'isi_satuan3',
                    label: 'Isi Satuan 3',
                    status: 'insert',
                    type: 'numeric',
                    required: false,
                },
                {
                    id: 'margin',
                    label: 'Margin Harga (%)',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Margin Harga Tidak Boleh Kosong',
                    numeric_max_number: 100,
                    numeric_callback: (args: any) => {
                        console.log(args);
                    }
                },
                {
                    id: 'qty_grosir1',
                    label: 'Qty Grosir 1',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Qty Grosir 1 Tidak Boleh Kosong',
                },
                {
                    id: 'harga_grosir1',
                    label: 'Harga Grosir 1',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Harga Grosir 1 Tidak Boleh Kosong',
                },
                {
                    id: 'qty_grosir2',
                    label: 'Qty Grosir 2',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Qty Grosir 2 Tidak Boleh Kosong',
                },
                {
                    id: 'harga_grosir2',
                    label: 'Harga Grosir 2',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Harga Grosir 2 Tidak Boleh Kosong',
                },
                {
                    id: 'tahun_produksi',
                    label: 'Tahun Produksi',
                    status: 'insert',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'stok_min',
                    label: 'Stok Min',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Stok Min Tidak Boleh Kosong',
                },
                {
                    id: 'harga_jual',
                    label: 'Harga Jual',
                    status: 'insert',
                    type: 'numeric',
                    required: false,
                    validator: 'Harga Jual Tidak Boleh Kosong',
                },
                {
                    id: 'image',
                    label: 'Image',
                    status: 'insert',
                    type: 'string',
                    required: false,
                    hidden: true,
                }
            ],
            custom_class: 'grid-rows-11'
        };

        this.DashboardProps = {
            title: 'Input Setup Barang',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };
    }

    ngOnInit(): void {
        this.getFormAdditionalData();
    }

    getFormAdditionalData(): void {
        // ** Divisi
        const indexDivisi = this.FormInput.fields.findIndex((item) => { return item.id == 'id_divisi' });

        this._store.dispatch(new SetupDivisiAction.GetAll())
            .subscribe((result) => {
                if (result.setup_divisi.entities.success) {
                    this.FormInput.fields[indexDivisi].select_props = result.setup_divisi.entities.data.map((item: any) => {
                        return { name: item.divisi, value: item.id_divisi }
                    });
                }
            })

        // ** Group
        const indexGroup = this.FormInput.fields.findIndex((item) => { return item.id == 'id_group' });

        this._store.dispatch(new SetupGroupAction.GetAll())
            .subscribe((result) => {
                if (result.setup_group.entities.success) {
                    this.FormInput.fields[indexGroup].select_props = result.setup_group.entities.data.map((item: any) => {
                        return { name: item.group, value: item.id_group }
                    });
                }
            })

        // ** Merk
        const indexMerk = this.FormInput.fields.findIndex((item) => { return item.id == 'id_merk' });

        this._store.dispatch(new SetupMerkAction.GetAll())
            .subscribe((result) => {
                if (result.setup_merk.entities.success) {
                    this.FormInput.fields[indexMerk].select_props = result.setup_merk.entities.data.map((item: any) => {
                        return { name: item.merk, value: item.id_merk }
                    });
                }
            })

        // ** Satuan
        const indexSatuan = this.FormInput.fields.findIndex((item) => { return item.id == 'id_satuan' });
        const indexSatuan2 = this.FormInput.fields.findIndex((item) => { return item.id == 'id_satuan2' });
        const indexSatuan3 = this.FormInput.fields.findIndex((item) => { return item.id == 'id_satuan3' });

        this._store.dispatch(new SetupSatuanAction.GetAll())
            .subscribe((result) => {
                if (result.setup_satuan.entities.success) {
                    const satuan = result.setup_satuan.entities.data.map((item: any) => {
                        return { name: item.nama_satuan, value: item.id_satuan }
                    });

                    this.FormInput.fields[indexSatuan].select_props = satuan;
                    this.FormInput.fields[indexSatuan2].select_props = satuan;
                    this.FormInput.fields[indexSatuan3].select_props = satuan;
                }
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['setup-data/setup-inventory/setup-barang/list']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    handleSubmitForm(): void {
        const data = this.CustomForm.handleSubmitForm();

        this._store.dispatch(new SetupBarangAction.SaveBarang(data))
            .subscribe((result) => {
                if (result.setup_barang.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();
                }
            });
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }
}
