import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { MutasiWarehouseAction } from 'src/app/@shared/state/inventory/mutasi-warehouse';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-mutasi-warehouse',
    templateUrl: './input-mutasi-warehouse.component.html',
    styleUrls: ['./input-mutasi-warehouse.component.scss']
})
export class InputMutasiWarehouseComponent implements OnInit {
    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

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
    ) {
        this.DashboardProps = {
            title: 'Input Mutasi Warehouse',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_mutasi_warehouse_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_mutasi_warehouse',
                    label: 'Tgl. Mutasi',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'warehouse_asal',
                    label: 'Warehouse Asal',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                    select_callback: (data) => {
                        this.onChangeWarehouseAsal(data);
                    },
                },
                {
                    id: 'warehouse_tujuan',
                    label: 'Warehouse Tujuan',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                },

            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.FormInputFooter = {
            id: 'form_mutasi_warehouse_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'qty',
                    label: 'Jumlah Item',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_harga',
                    label: 'Total Mutasi',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-1',
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_satuan', headerName: 'HARGA SATUAN', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 200, sortable: true, resizable: true, },
            ],
            dataSource: [],
            height: "250px",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };

        this.FormInputDetail = {
            title: 'Item',
            type: 'add',
            form_props: {
                id: 'form_penerimaan_tanpa_po_detail',
                type: 'save',
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
                                { field: 'kode_barang', width: 250, headerName: 'KODE BARANG', sortable: true, resizable: true },
                                { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                                { field: 'barcode', width: 250, headerName: 'BARCODE', sortable: true, resizable: true },
                                {
                                    field: 'harga_beli_terakhir', width: 250, headerName: 'HARGA BELI TERAKHIR', sortable: true, resizable: true,
                                    cellClass: 'text-end',
                                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e }
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
                            url: `${environment.endpoint}/barang/by_param`,
                            callback: (data) => {
                                this.HargaSatuan = data.harga_beli_terakhir ? parseFloat(data.harga_beli_terakhir) : 0;
                                this.FormDialog.CustomForm.CustomForms.get('harga_satuan')?.setValue(this.HargaSatuan);
                                this.onGetSatuan(data.satuan);
                            }
                        },
                        lookup_set_value_field: ['barcode', 'nama_barang'],
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
                        id: 'nama_barang',
                        label: 'Nama Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'banyak',
                        label: 'Banyak',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        numeric_callback: (data) => {
                            this.handleChangeBanyak(data);
                        }
                    },
                    {
                        id: 'kode_satuan',
                        label: 'Satuan',
                        status: 'insert',
                        type: 'select',
                        select_props: [],
                        required: true,
                        select_callback: (data) => {
                            this.onChangeSatuan(data);
                        }
                    },
                    {
                        id: 'isi',
                        label: 'Isi',
                        status: 'readonly',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'qty',
                        label: 'Qty',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        numeric_callback: (data) => {
                            this.handleChangeQty(data);
                        }
                    },
                    {
                        id: 'harga_satuan',
                        label: 'Harga Satuan',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        numeric_callback: (data) => {
                            this.handleChangeHargaSatuan(data);
                        }
                    },
                    {
                        id: 'sub_total',
                        label: 'Subtotal',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'keterangan',
                        label: 'Keterangan',
                        status: 'insert',
                        type: 'string',
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-4 grid-cols-2'
            },
            width: '65vw'
        };
    }

    ngOnInit(): void {
        this.onGetWarehouse();
    }

    onGetWarehouse(): void {
        this._store.dispatch(new SetupWarehouseAction.GetAll())
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
                const indexWarehouseAsal = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'warehouse_asal'
                });

                const indexWarehouseTujuan = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'warehouse_tujuan'
                });

                const data = result.map((item) => {
                    return {
                        name: item.warehouse,
                        value: item.id_warehouse
                    }
                });

                this.CustomForm.props.fields[indexWarehouseAsal].select_props = data;

                this.CustomForm.props.fields[indexWarehouseTujuan].select_props = data;
            })
    }

    onChangeWarehouseAsal(data: any): void {
        const indexIdBarang = this.FormInputDetail.form_props.fields.findIndex((item) => {
            return item.id == 'id_barang';
        });

        (this.FormDialog.CustomForm.props.fields[indexIdBarang] as any).lookup_props.url = `${environment.endpoint}/mutasi_warehouse/lookup_barang/${data.value}`;
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['inventory/mutasi-warehouse/history']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onToolbarClicked(args: any): void {
        switch (args.id) {
            case 'add':
                this.FormInputDetail.type = 'add';
                this.FormDialog.onOpenFormDialog();
                this
                break;
            case 'delete':
                const selectedIndex = this.GridProps.dataSource.findIndex((item) => { return item.urut == this.GridSelectedData.urut });
                console.log("selected index =>", selectedIndex);

                let copyDatasource = JSON.parse(JSON.stringify(this.GridProps.dataSource));
                copyDatasource.splice(selectedIndex, 1);

                this.GridProps.dataSource = copyDatasource;
                break;
            default:
                break;
        }
    }

    onGetSatuan(data: SetupBarangModel.ISetupBarangSatuan[]): void {
        const index = this.FormDialog.CustomForm.props.fields.findIndex((item) => {
            return item.id == 'kode_satuan'
        });

        this.FormDialog.CustomForm.props.fields[index].select_props = data.map((item) => {
            return {
                name: item.nama_satuan,
                value: item.kode_satuan,
                isi: item.isi,
            }
        });
    }

    onChangeSatuan(data: SetupBarangModel.ISetupBarangSatuan): void {
        this.FormDialog.CustomForm.handleSetFieldValue('isi', data.isi);
        this.FormDialog.CustomForm.handleSetFieldValue('qty', (this.Banyak * data.isi!));
        this.Qty = (this.Banyak * data.isi!);
        this.onCountSubtotal();
    }

    handleChangeBanyak(value: number): void {
        this.Banyak = value;

        const isi = this.FormDialog.CustomForm.handleGetFieldValue('isi');
        this.FormDialog.CustomForm.handleSetFieldValue('qty', (this.Banyak * isi));
        this.Qty = (this.Banyak * isi);
        this.onCountSubtotal();
    }

    handleChangeQty(value: number): void {
        this.Qty = value;
        this.onCountSubtotal();
    }

    handleChangeHargaSatuan(value: number): void {
        this.HargaSatuan = value;
        this.FormDialog.CustomForm.handleSetFieldValue('sub_total', (this.Qty * this.HargaSatuan));
        this.onCountSubtotal();
    }

    handleSubmitFormDetail(data: any): void {
        data.urut = this.GridProps.dataSource.length + 1;
        this.GridProps.dataSource = [...this.GridProps.dataSource, data];
        this.FormDialog.onCloseFormDialog();
        this.onCountFormFooter();
    }

    private onCountSubtotal() {
        const value = this.FormDialog.CustomForm.CustomForms.value;
        this.FormDialog.CustomForm.CustomForms.get('qty')?.setValue(value.isi * value.banyak);
        this.FormDialog.CustomForm.CustomForms.get('sub_total')?.setValue(value.qty * value.harga_satuan);
    }

    onCountFormFooter(): void {
        let qty = 0;
        let subtotal = 0;

        this.GridProps.dataSource.forEach((item) => {
            qty += parseFloat(item.qty);
            subtotal += parseFloat(item.sub_total);

            this.CustomFormFooter.handleSetFieldValue('qty', qty);
            this.CustomFormFooter.handleSetFieldValue('total_harga', subtotal);
        });
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;

        const footer = this.CustomFormFooter.handleSubmitForm();

        const payload = this._utilityService.JoinTwoObject(header, footer);

        this._store.dispatch(new MutasiWarehouseAction.Save(payload))
            .subscribe((result) => {
                if (result.mutasi_warehouse.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['inventory/mutasi-warehouse/history']);
                    }, 1500);
                }
            });
    }
}
