import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { map } from 'rxjs';
import { SettingStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/setting-stok-opname.service';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { SetupDivisiAction, SetupDivisiState } from 'src/app/@shared/state/setup-data/setup-divisi';
import { SetupGroupAction, SetupGroupState } from 'src/app/@shared/state/setup-data/setup-group';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-setting-stok-opname',
    templateUrl: './input-setting-stok-opname.component.html',
    styleUrls: ['./input-setting-stok-opname.component.scss']
})
export class InputSettingStokOpnameComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    JenisStokOpname: 'barang' | 'divisi' | 'group' | 'supplier' = 'barang';

    GridBarangProps: GridModel.IGrid;
    GridBarangSelectedData: any = {} as any;

    GridDivisiProps: GridModel.IGrid;
    GridDivisiSelectedData: any = {} as any;

    GridGroupProps: GridModel.IGrid;
    GridGroupSelectedData: any = {} as any;

    GridSupplierProps: GridModel.IGrid;
    GridSupplierSelectedData: any = {} as any;

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

    Banyak: number = 0;
    Qty: number = 0;
    HargaSatuan: number = 0;
    TotalMutasi: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _setupBarangService: SetupBarangService,
        private _confirmationService: ConfirmationService,
        private _settingStokOpnameService: SettingStokOpnameService,
    ) {
        this.DashboardProps = {
            title: 'Input Setting Stok Opname',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_mutasi_lokasi_keluar_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_setting_stok_opname',
                    label: 'Tgl. Setting',
                    status: 'insert',
                    type: 'datetime',
                    required: true,
                },
                {
                    id: 'id_warehouse',
                    label: 'Warehouse',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                    select_callback: (data) => {
                        this.onChangeWarehouse(data);
                    },
                },
                {
                    id: 'jenis_stok_opname',
                    label: 'Jenis Stok Opname',
                    status: 'insert',
                    type: 'select',
                    select_props: [
                        { name: 'Barang', value: 'barang' },
                        { name: 'Divisi', value: 'divisi' },
                        { name: 'Group', value: 'group' },
                        { name: 'Supplier', value: 'supplier' },
                    ],
                    required: false,
                    select_callback: (data) => {
                        this.JenisStokOpname = data.value;
                    },
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.GridBarangProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_barang', headerName: 'NAMA BARANG', flex: 350, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 24rem)",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.GridDivisiProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_divisi', headerName: 'ID DIVISI', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_divisi', headerName: 'KODE DIVISI', flex: 350, sortable: true, resizable: true },
                { field: 'divisi', headerName: 'NAMA DIVISI', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.GridGroupProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_group', headerName: 'ID GROUP', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_group', headerName: 'KODE GROUP', flex: 350, sortable: true, resizable: true },
                { field: 'group', headerName: 'NAMA GROUP', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.GridSupplierProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_supplier', headerName: 'ID SUPPLIER', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', flex: 350, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', flex: 350, sortable: true, resizable: true },
                { field: 'alamat', headerName: 'ALAMAT', flex: 350, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_mutasi_warehouse_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'insert',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-1',
        };

        this.FormInputDetail = {
            title: 'Item',
            type: 'add',
            form_props: {
                id: 'form_mutasi_keluar_detail',
                type: 'save',
                is_inline: true,
                fields: [
                    // ** Barang ==
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
                        lookup_set_value_field: ['barcode', 'kode_barang', 'nama_barang'],
                        required: true,
                    },
                    {
                        id: 'barcode',
                        label: 'Barcode',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'kode_barang',
                        label: 'Kode Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'nama_barang',
                        label: 'Nama Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    // ** Divisi ==
                    {
                        id: 'id_divisi',
                        label: 'Divisi',
                        status: 'insert',
                        type: 'select',
                        hidden: false,
                        select_props: [],
                        required: true,
                        select_callback: (data: any) => {
                            this._store
                                .select(SetupDivisiState.allSetupDivisi)
                                .subscribe((result: any) => {
                                    console.log(result);
                                    const divisi = result.data.find((item: any) => item.id_divisi == data.value);
                                    this.FormDialog.CustomForm.CustomForms.get('kode_divisi')?.setValue(divisi.kode_divisi);
                                    this.FormDialog.CustomForm.CustomForms.get('divisi')?.setValue(divisi.divisi);
                                })
                        }
                    },
                    {
                        id: 'kode_divisi',
                        label: 'Kode Divisi',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'divisi',
                        label: 'Nama Divisi',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    // ** Group ==
                    {
                        id: 'id_group',
                        label: 'Group',
                        status: 'insert',
                        type: 'select',
                        select_props: [],
                        hidden: false,
                        required: true,
                        select_callback: (data: any) => {
                            this._store
                                .select(SetupGroupState.allSetupGroup)
                                .subscribe((result: any) => {
                                    const group = result.data.find((item: any) => item.id_group == data.value);
                                    this.FormDialog.CustomForm.CustomForms.get('kode_group')?.setValue(group.kode_group);
                                    this.FormDialog.CustomForm.CustomForms.get('group')?.setValue(group.group);
                                })
                        }
                    },
                    {
                        id: 'kode_group',
                        label: 'Kode Group',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'group',
                        label: 'Nama Group',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    // ** Supplier ==
                    {
                        id: 'id_supplier',
                        label: 'Supplier',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupSupplier',
                            title: 'Data Supplier',
                            columns: [
                                { field: 'kode_supplier', flex: 200, headerName: 'KODE SUPPLIER', sortable: true, resizable: true },
                                { field: 'nama_supplier', flex: 275, headerName: 'NAMA SUPPLIER', sortable: true, resizable: true },
                                { field: 'alamat', flex: 290, headerName: 'ALAMAT SUPPLIER', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_supplier', title: 'Kode Supplier', type: 'contain', value: 'ms.kode_supplier' },
                                { id: 'nama_supplier', title: 'Nama Supplier', type: 'contain', value: 'ms.nama_supplier' },
                            ],
                            label: 'Supplier',
                            selectedField: 'nama_supplier',
                            selectedValue: 'id_supplier',
                            url: `${environment.endpoint}/supplier/by_param`,
                        },
                        lookup_set_value_field: ['kode_supplier', 'nama_supplier', 'alamat'],
                        required: true,
                    },
                    {
                        id: 'kode_supplier',
                        label: 'Kode Supplier',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'nama_supplier',
                        label: 'Nama Supplier',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'alamat',
                        label: 'Alamat',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-1 grid-cols-1'
            },
            width: '65vw'
        };
    }

    ngOnInit(): void {
        this.onGetWarehouse();
        this.getAllDivisi();
        this.getAllGroup();
    }

    onGetWarehouse(): void {
        this._store
            .dispatch(new SetupWarehouseAction.GetAll())
            .pipe(
                map((result: any) => {
                    if (result.setup_warehouse.entities.success) {
                        return result.setup_warehouse.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result: SetupWarehouseModel.ISetupWarehouse[]) => {
                const indexWarehouse = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'id_warehouse'
                });

                const data = result.map((item) => {
                    return {
                        name: item.warehouse,
                        value: item.id_warehouse
                    }
                });

                this.CustomForm.props.fields[indexWarehouse].select_props = data;
            })
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
                const indexWarehouse = this.FormInputDetail.form_props.fields.findIndex((item) => {
                    return item.id == 'id_divisi'
                });

                const data = result.map((item: any) => {
                    return {
                        name: item.divisi,
                        value: item.id_divisi
                    }
                });

                this.FormInputDetail.form_props.fields[indexWarehouse].select_props = data;
            })
    }

    private getAllGroup() {
        this._store
            .dispatch(new SetupGroupAction.GetAll())
            .pipe(
                map((result: any) => {
                    if (result.setup_group.entities.success) {
                        return result.setup_group.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result: any) => {
                const indexWarehouse = this.FormInputDetail.form_props.fields.findIndex((item) => {
                    return item.id == 'id_group'
                });

                const data = result.map((item: any) => {
                    return {
                        name: item.group,
                        value: item.id_group
                    }
                });

                this.FormInputDetail.form_props.fields[indexWarehouse].select_props = data;
            })
    }

    onChangeWarehouse(data: any): void {
        const indexIdBarang = this.FormInputDetail.form_props.fields.findIndex((item) => {
            return item.id == 'id_barang';
        });

        (this.FormDialog.CustomForm.props.fields[indexIdBarang] as any).lookup_props.url = `${environment.endpoint}/mutasi_warehouse/lookup_barang/${data.value}`;
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['inventory/setting-stok-opname/history']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    getBarangByBarcode(args: any) {
        const filter: any = [
            {
                "column": "mb.barcode",
                "filter": "equal",
                "value": args.target.value,
                "value2": ""
            }
        ];

        this._setupBarangService
            .getAllBarang(filter)
            .subscribe((result) => {
                if (result.success && result.data.length) {
                    result.data[0].urut = this.GridBarangProps.dataSource.length + 1;
                    this.GridBarangProps.dataSource = [...this.GridBarangProps.dataSource, result.data[0]];

                    const el = document.getElementById('SearchBarang') as HTMLInputElement;
                    el.value = "";
                    el.focus();
                } else {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'error', summary: 'Oops', detail: 'Barang tidak ditemukan' });
                }
            })
    }

    onCellClicked(args: any): void {
        if (this.JenisStokOpname == 'barang') {
            this.GridBarangSelectedData = args;
        }

        if (this.JenisStokOpname == 'divisi') {
            this.GridDivisiSelectedData = args;
        }

        if (this.JenisStokOpname == 'group') {
            this.GridGroupSelectedData = args;
        }

        if (this.JenisStokOpname == 'supplier') {
            this.GridSupplierSelectedData = args;
        }
    }

    onToolbarClicked(args: any): void {
        switch (args.id) {
            case 'add':
                this.FormInputDetail.type = 'add';

                this.FormDialog.FormProps.fields[0].hidden = this.JenisStokOpname == 'barang' ? false : true;
                this.FormDialog.FormProps.fields[1].hidden = this.JenisStokOpname == 'barang' ? false : true;
                this.FormDialog.FormProps.fields[2].hidden = this.JenisStokOpname == 'barang' ? true : true;
                this.FormDialog.FormProps.fields[3].hidden = this.JenisStokOpname == 'barang' ? false : true;

                this.FormDialog.FormProps.fields[4].hidden = this.JenisStokOpname == 'divisi' ? false : true;
                this.FormDialog.FormProps.fields[5].hidden = this.JenisStokOpname == 'divisi' ? true : true;
                this.FormDialog.FormProps.fields[6].hidden = this.JenisStokOpname == 'divisi' ? true : true;

                this.FormDialog.FormProps.fields[7].hidden = this.JenisStokOpname == 'group' ? false : true;
                this.FormDialog.FormProps.fields[8].hidden = this.JenisStokOpname == 'group' ? true : true;
                this.FormDialog.FormProps.fields[9].hidden = this.JenisStokOpname == 'group' ? true : true;

                this.FormDialog.FormProps.fields[10].hidden = this.JenisStokOpname == 'supplier' ? false : true;
                this.FormDialog.FormProps.fields[11].hidden = this.JenisStokOpname == 'supplier' ? true : true;
                this.FormDialog.FormProps.fields[12].hidden = this.JenisStokOpname == 'supplier' ? true : true;
                this.FormDialog.FormProps.fields[13].hidden = this.JenisStokOpname == 'supplier' ? true : true;

                if (this.JenisStokOpname == 'barang') {
                    this.FormDialog.FormProps.custom_class = 'grid-rows-3 grid-cols-1';
                    this.FormDialog.CustomForm.handleSetFormClass('grid-rows-3 grid-cols-1')
                }

                if (this.JenisStokOpname == 'supplier' || this.JenisStokOpname == 'group' || this.JenisStokOpname == 'divisi') {
                    this.FormDialog.FormProps.custom_class = 'grid-rows-1 grid-cols-1';
                    this.FormDialog.CustomForm.handleSetFormClass('grid-rows-1 grid-cols-1')
                }

                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                if (this.JenisStokOpname == 'barang') {
                    const selectedIndex = this.GridBarangProps.dataSource.findIndex((item) => { return item.urut == this.GridBarangSelectedData.urut });
                    let copyDatasource = JSON.parse(JSON.stringify(this.GridBarangProps.dataSource));
                    copyDatasource.splice(selectedIndex, 1);
                    this.GridBarangProps.dataSource = copyDatasource;
                };

                if (this.JenisStokOpname == 'divisi') {
                    const selectedIndex = this.GridDivisiProps.dataSource.findIndex((item) => { return item.urut == this.GridDivisiSelectedData.urut });
                    let copyDatasource = JSON.parse(JSON.stringify(this.GridDivisiProps.dataSource));
                    copyDatasource.splice(selectedIndex, 1);
                    this.GridDivisiProps.dataSource = copyDatasource;
                };

                if (this.JenisStokOpname == 'group') {
                    const selectedIndex = this.GridGroupProps.dataSource.findIndex((item) => { return item.urut == this.GridGroupSelectedData.urut });
                    let copyDatasource = JSON.parse(JSON.stringify(this.GridGroupProps.dataSource));
                    copyDatasource.splice(selectedIndex, 1);
                    this.GridGroupProps.dataSource = copyDatasource;
                };

                if (this.JenisStokOpname == 'supplier') {
                    const selectedIndex = this.GridSupplierProps.dataSource.findIndex((item) => { return item.urut == this.GridSupplierSelectedData.urut });
                    let copyDatasource = JSON.parse(JSON.stringify(this.GridSupplierProps.dataSource));
                    copyDatasource.splice(selectedIndex, 1);
                    this.GridSupplierProps.dataSource = copyDatasource;
                };
                break;
            default:
                break;
        }
    }

    handleSubmitFormDetail(data: any): void {
        if (this.JenisStokOpname == 'barang') {
            data.urut = this.GridBarangProps.dataSource.length + 1;
            this.GridBarangProps.dataSource = [...this.GridBarangProps.dataSource, data];
        }

        if (this.JenisStokOpname == 'divisi') {
            data.urut = this.GridDivisiProps.dataSource.length + 1;
            this.GridDivisiProps.dataSource = [...this.GridDivisiProps.dataSource, data];
        }

        if (this.JenisStokOpname == 'group') {
            data.urut = this.GridGroupProps.dataSource.length + 1;
            this.GridGroupProps.dataSource = [...this.GridGroupProps.dataSource, data];
        }

        if (this.JenisStokOpname == 'supplier') {
            data.urut = this.GridSupplierProps.dataSource.length + 1;
            this.GridSupplierProps.dataSource = [...this.GridSupplierProps.dataSource, data];
        }

        this.FormDialog.onCloseFormDialog();
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail_barang = this.JenisStokOpname == 'barang' ? this.GridBarangProps.dataSource.map((item) => { return { id_barang: item.id_barang } }) : [];
        header.detail_divisi = this.JenisStokOpname == 'divisi' ? this.GridDivisiProps.dataSource.map((item) => { return { id_divisi: item.id_divisi } }) : [];
        header.detail_group = this.JenisStokOpname == 'group' ? this.GridGroupProps.dataSource.map((item) => { return { id_group: item.id_group } }) : [];
        header.detail_supplier = this.JenisStokOpname == 'supplier' ? this.GridSupplierProps.dataSource.map((item) => { return { id_supplier: item.id_supplier } }) : [];

        const footer = this.CustomFormFooter.handleSubmitForm();
        const payload = this._utilityService.JoinTwoObject(header, footer);

        this.onSaveWithConditionPrint(false, payload)
    }

    private onSaveWithConditionPrint(print: boolean, payload: any) {
        this._settingStokOpnameService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    if (print) {
                        setTimeout(() => {
                            this._router.navigate([`inventory/setting-stok-opname/print/${result.data}`]);
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            this._router.navigate([`inventory/setting-stok-opname/history`]);
                        }, 1500);
                    }
                }
            });
    }

}
