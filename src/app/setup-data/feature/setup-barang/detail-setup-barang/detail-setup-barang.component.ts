import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangAction } from 'src/app/@shared/state/setup-data/setup-barang';
import { SetupDivisiAction } from 'src/app/@shared/state/setup-data/setup-divisi';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';
import { SetupMerkAction } from 'src/app/@shared/state/setup-data/setup-merk';
import { SetupSatuanAction } from 'src/app/@shared/state/setup-data/setup-satuan';
import { SetupSupplierAction } from 'src/app/@shared/state/setup-data/setup-supplier';

@Component({
    selector: 'app-detail-setup-barang',
    templateUrl: './detail-setup-barang.component.html',
    styleUrls: ['./detail-setup-barang.component.scss']
})
export class DetailSetupBarangComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInput: CustomFormModel.IForm;

    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    PageState: 'detail' | 'barang_satuan' | 'barang_rak' | 'barang_komponen' | 'barang_urai' | 'kartu_stok' = 'detail';

    IdBarang: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
    ) {
        this.FormInput = {
            id: 'input_setup_barang',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_barang',
                    label: 'Id Barang',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
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
                    required: true,
                    validator: 'Ukuran Tidak Boleh Kosong',
                },
                {
                    id: 'warna',
                    label: 'Warna',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    validator: 'Warna Tidak Boleh Kosong',
                },
                {
                    id: 'berat',
                    label: 'Berat',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Berat Tidak Boleh Kosong',
                },
                {
                    id: 'id_supplier',
                    label: 'Supplier',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
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
                    label: 'Margin Harga',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    validator: 'Margin Harga Tidak Boleh Kosong',
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
            title: 'Detail Setup Barang',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'delete', caption: 'Delete', icon: 'pi pi-trash text-xs' },
                { id: 'update', caption: 'Update', icon: 'pi pi-save text-xs' },
                { id: 'ubah_status', caption: 'Ubah Status Active', icon: 'pi pi-sync text-xs' },
            ],
        };
    }

    ngOnInit(): void {
        this.getFormAdditionalData();
        this.getDetailByIdBarang();
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

        // ** Supplier
        const indexSupplier = this.FormInput.fields.findIndex((item) => { return item.id == 'id_supplier' });

        this._store.dispatch(new SetupSupplierAction.GetAll([]))
            .subscribe((result) => {
                if (result.setup_supplier.entities.success) {
                    this.FormInput.fields[indexSupplier].select_props = result.setup_supplier.entities.data.map((item: any) => {
                        return { name: item.nama_supplier, value: item.id_supplier }
                    });
                }
            });
    }

    getDetailByIdBarang(): void {
        this.IdBarang = this._activatedRoute.snapshot.params.id;

        this._store.dispatch(new SetupBarangAction.GetByIdBarang(this.IdBarang))
            .pipe(
                map((result) => {
                    if (result.setup_barang.entities.success) {
                        return result.setup_barang.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.FormInput.default_value = result;
                this.CustomForm.handleSetFormDefaultValue();
            })
    }

    handleChangeTabView(args: any): void {
        switch (args.index) {
            case 0:
                console.log("Detail Barang");
                this.DashboardProps.button_navigation = [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                    { id: 'delete', caption: 'Delete', icon: 'pi pi-trash text-xs' },
                    { id: 'update', caption: 'Update', icon: 'pi pi-save text-xs' },
                    { id: 'ubah_status', caption: 'Ubah Status Active', icon: 'pi pi-sync text-xs' },
                ];
                this.PageState = 'detail';
                break;
            case 1:
                console.log("Setup Barang Satuan");
                this.DashboardProps.button_navigation = [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                ];
                this.PageState = 'barang_satuan';
                break;
            case 2:
                console.log("Setup Barang Rak");
                this.DashboardProps.button_navigation = [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                ];
                this.PageState = 'barang_rak';
                break;
            case 3:
                console.log("Setup Barang Komponen");
                this.DashboardProps.button_navigation = [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                ];
                this.PageState = 'barang_komponen';
                break;
            case 4:
                console.log("Setup Barang Urai");
                this.DashboardProps.button_navigation = [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                ];
                this.PageState = 'barang_urai';
                break;
            case 5:
                console.log("Kartu Stok Barang");
                this.DashboardProps.button_navigation = [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                ];
                this.PageState = 'kartu_stok';
                break;
            default:
                break;
        }
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['setup-data/setup-inventory/setup-barang/list']);
                break;
            case 'update':
                this.handleSubmitForm();
                break;
            case 'delete':
                this.handleDeleteBarang();
                break;
            case 'ubah_status':
                this.handleUbahStatusActiveBarang();
                break;
            default:
                break;
        }
    }

    handleSubmitForm(): void {
        const data = this.CustomForm.handleSubmitForm();

        this._store
            .dispatch(new SetupBarangAction.UpdateBarang(data))
            .subscribe((result) => {
                if (result.setup_barang.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                    this.getDetailByIdBarang();
                }
            });
    }

    handleDeleteBarang(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._store
            .dispatch(new SetupBarangAction.DeleteBarang(id))
            .subscribe((result) => {
                if (result.setup_barang.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                    setTimeout(() => {
                        this._router.navigate(['setup-data/setup-inventory/setup-barang/list']);
                    }, 1500);
                }
            })
    }

    handleUbahStatusActiveBarang(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._store
            .dispatch(new SetupBarangAction.UbahStatusActiveBarang(id))
            .subscribe((result) => {
                if (result.setup_barang.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Status Berhasil Diubah' });

                    setTimeout(() => {
                        this._router.navigate(['setup-data/setup-inventory/setup-barang/list']);
                    }, 1500);
                }
            })
    }
}
