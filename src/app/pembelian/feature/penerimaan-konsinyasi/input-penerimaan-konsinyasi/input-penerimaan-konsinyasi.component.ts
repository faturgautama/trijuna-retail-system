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
import { PenerimaanKonsinyasiModel } from 'src/app/@shared/models/pembelian/penerimaan-konsinyasi.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { PenerimaanKonsinyasiAction } from 'src/app/@shared/state/pembelian/penerimaan-konsinyasi';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-penerimaan-konsinyasi',
    templateUrl: './input-penerimaan-konsinyasi.component.html',
    styleUrls: ['./input-penerimaan-konsinyasi.component.scss']
})
export class InputPenerimaanKonsinyasiComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

    FormInputFooter: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    // ** For Modal Dialog Detail
    Banyak: number = 0;
    Qty: number = 0;
    HargaOrder: number = 0;
    Diskon1Persen: number = 0;
    Diskon1Rupiah: number = 0;
    TotalAfterDiskon1: number = 0;
    Diskon2Persen: number = 0;
    Diskon2Rupiah: number = 0;
    TotalAfterDiskon2: number = 0;
    Diskon3Persen: number = 0;
    Diskon3Rupiah: number = 0;
    TotalAfterDiskon3: number = 0;
    Subtotal: number = 0;

    // ** Footer
    @ViewChild('Keterangan') Keterangan!: ElementRef;

    DiskonFooter: number = 0;

    GridProps: GridModel.IGrid = {} as any;
    GridSelectedData: PenerimaanKonsinyasiModel.IPenerimaanKonsinyasiDetail = {} as any;
    GridSelectedIndex: number = 0;
    GridDatasource: any[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Input Penerimaan Konsinyasi',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_penerimaan_konsinyasi_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'no_nota',
                    label: 'No. Nota',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tanggal_nota',
                    label: 'Tgl. Nota',
                    status: 'insert',
                    type: 'date',
                    required: true,
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
                            { field: 'kode_supplier', width: 200, headerName: 'KODE SUPPLIER', sortable: true, resizable: true },
                            { field: 'nama_supplier', width: 275, headerName: 'NAMA SUPPLIER', sortable: true, resizable: true },
                            { field: 'alamat', width: 290, headerName: 'ALAMAT SUPPLIER', sortable: true, resizable: true },
                        ],
                        filter: [
                            { id: 'kode_supplier', title: 'Kode Supplier', type: 'contain', value: 'ms.kode_supplier' },
                            { id: 'nama_supplier', title: 'Nama Supplier', type: 'contain', value: 'ms.nama_supplier' },
                        ],
                        label: 'Supplier',
                        selectedField: 'nama_supplier',
                        selectedValue: 'id_supplier',
                        url: `${environment.endpoint}/supplier/by_param`
                    },
                    lookup_set_value_field: ['alamat'],
                    required: true,
                },
                {
                    id: 'alamat',
                    label: 'Alamat',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'id_lokasi',
                    label: 'Lokasi',
                    status: 'readonly',
                    type: 'select',
                    select_props: [],
                    required: true,
                },
                {
                    id: 'id_warehouse',
                    label: 'Warehouse',
                    status: 'readonly',
                    type: 'select',
                    select_props: [],
                    required: true,
                },

            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        };

        this.FormInputDetail = {
            title: 'Item',
            type: 'add',
            form_props: {
                id: 'form_penerimaan_konsinyasi_detail',
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
                            ],
                            filter: [
                                { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                                { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                                { id: 'barcode', title: 'Barcode', type: 'contain', value: 'mb.barcode' },
                            ],
                            label: 'Barang',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang/by_param`,
                            callback: (data) => {
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
                        id: 'harga_order',
                        label: 'Harga Order',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        numeric_callback: (data) => {
                            this.handleChangeHargaOrder(data);
                        }
                    },
                    {
                        id: 'diskon_persen_1',
                        label: 'Diskon 1',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        is_form_grouped: true,
                        numeric_callback: (data) => {
                            this.handleChangeDiskon1Persen(data);
                        },
                        form_grouped_props: {
                            id: 'diskon_nominal_1',
                            label: 'Diskon 1 (Rp. )',
                            status: 'readonly',
                            type: 'numeric',
                            required: true,
                        }
                    },
                    {
                        id: 'diskon_persen_2',
                        label: 'Diskon 2',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        is_form_grouped: true,
                        numeric_callback: (data) => {
                            this.handleChangeDiskon2Persen(data);
                        },
                        form_grouped_props: {
                            id: 'diskon_nominal_2',
                            label: 'Diskon 1 (Rp. )',
                            status: 'readonly',
                            type: 'numeric',
                            required: true,
                        }
                    },
                    {
                        id: 'diskon_persen_3',
                        label: 'Diskon 3',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        is_form_grouped: true,
                        numeric_callback: (data) => {
                            this.handleChangeDiskon3Persen(data);
                        },
                        form_grouped_props: {
                            id: 'diskon_nominal_3',
                            label: 'Diskon 3 (Rp. )',
                            status: 'readonly',
                            type: 'numeric',
                            required: true,
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
                        id: 'qty_bonus',
                        label: 'Qty Bonus',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'nama_bonus',
                        label: 'Nama Bonus',
                        status: 'insert',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'biaya_barcode',
                        label: 'Biaya Barcode',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-7 grid-cols-2'
            },
            width: '65vw'
        };

        this.FormInputFooter = {
            id: 'form_penerimaan_konsinyasi_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'qty',
                    label: 'Jumlah Item',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'sub_total1',
                    label: 'Subtotal 1',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'diskon_persen',
                    label: 'Diskon',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: true,
                    numeric_callback: (data) => {
                        this.handleChangeDiskonFooter(data);
                    },
                    form_grouped_props: {
                        id: 'diskon_nominal',
                        label: 'Diskon',
                        status: 'readonly',
                        type: 'numeric',
                        required: true,
                    }
                },
                {
                    id: 'sub_total2',
                    label: 'Subtotal 2',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'ppn_nominal',
                    label: 'PPn',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'pembulatan',
                    label: 'Pembulatan',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'total_transaksi',
                    label: 'Grand Total',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'total_biaya_barcode',
                    label: 'Total Biaya Barcode',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-8 grid-cols-1',
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_pemesanan', headerName: 'ID PEMESANAN', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'id_pemesanan_detail', headerName: 'ID PEMESANAN DETAIL', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 150, sortable: true, resizable: true, },
                { field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true },
                { field: 'harga_order', headerName: 'HARGA ORDER', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_1', headerName: 'DISKON 1 (%)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_1', headerName: 'DISKON 1 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_2', headerName: 'DISKON 2 (%)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_2', headerName: 'DISKON 2 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_3', headerName: 'DISKON 3 (%)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_3', headerName: 'DISKON 3 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty_bonus', headerName: 'QTY BONUS', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'nama_bonus', headerName: 'NAMA BONUS', width: 180, sortable: true, resizable: true },
                {
                    field: 'biaya_barcode', headerName: 'BIAYA BARCODE', width: 180, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
            ],
            dataSource: [],
            height: "250px",
            showPaging: false,
            toolbar: ['Add', 'Delete'],
        };
    }

    ngOnInit(): void {
        this.onGetLokasi();
        this.onGetWarehouse();
    }

    onGetLokasi(): void {
        this._store.dispatch(new SetupLokasiAction.GetAll())
            .pipe(
                map((result: any) => {
                    if (result.setup_lokasi.entities.success) {
                        return result.setup_lokasi.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result: SetupLokasiModel.ISetupLokasi[]) => {
                const index = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'id_lokasi'
                });

                this.CustomForm.props.fields[index].select_props = result.map((item) => {
                    return {
                        name: item.nama_lokasi,
                        value: item.id_lokasi
                    }
                });
            })
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
                const index = this.CustomForm.props.fields.findIndex((item) => {
                    return item.id == 'id_warehouse'
                });

                this.CustomForm.props.fields[index].select_props = result.map((item) => {
                    return {
                        name: item.warehouse,
                        value: item.id_warehouse
                    }
                });
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['pembelian/konsinyasi/history']);
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
                this.GridProps.dataSource.splice(selectedIndex, 1);
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

        this.Qty = (this.Banyak * data.isi!)
    }

    handleChangeBanyak(value: number): void {
        this.Banyak = value;
    }

    handleChangeQty(value: number): void {
        this.Qty = value;
    }

    handleChangeHargaOrder(value: number): void {
        this.HargaOrder = value;
        this.FormDialog.CustomForm.handleSetFieldValue('sub_total', (this.Qty * this.HargaOrder));
    }

    handleChangeDiskon1Persen(value: number): void {
        this.Diskon1Persen = value;
        this.Diskon1Rupiah = (this.HargaOrder * this.Qty) * (this.Diskon1Persen / 100);
        this.FormDialog.CustomForm.handleSetFieldValue('diskon_nominal_1', this.Diskon1Rupiah);

        this.TotalAfterDiskon1 = (this.HargaOrder * this.Qty) - this.Diskon1Rupiah;
        this.FormDialog.CustomForm.handleSetFieldValue('sub_total', this.TotalAfterDiskon1);
    }

    handleChangeDiskon2Persen(value: number): void {
        this.Diskon2Persen = value;
        this.Diskon2Rupiah = (this.TotalAfterDiskon1) * (this.Diskon2Persen / 100);
        this.FormDialog.CustomForm.handleSetFieldValue('diskon_nominal_2', this.Diskon2Rupiah);

        this.TotalAfterDiskon2 = this.TotalAfterDiskon1 - this.Diskon2Rupiah;
        this.FormDialog.CustomForm.handleSetFieldValue('sub_total', this.TotalAfterDiskon2);
    }

    handleChangeDiskon3Persen(value: number): void {
        this.Diskon3Persen = value;
        this.Diskon3Rupiah = (this.TotalAfterDiskon2) * (this.Diskon3Persen / 100);
        this.FormDialog.CustomForm.handleSetFieldValue('diskon_nominal_3', this.Diskon3Rupiah);

        this.TotalAfterDiskon3 = this.TotalAfterDiskon2 - this.Diskon3Rupiah;
        this.FormDialog.CustomForm.handleSetFieldValue('sub_total', this.TotalAfterDiskon3);
    }

    handleSubmitFormDetail(data: any): void {
        data.urut = this.GridProps.dataSource.length + 1;
        this.GridProps.dataSource = [...this.GridProps.dataSource, data];
        this.FormDialog.onCloseFormDialog();

        this.onCountFormFooter();
    }

    handleChangeDiskonFooter(value: number): void {
        const diskonNominalFooter = this.CustomFormFooter.handleGetFieldValue('sub_total1') * (value / 100);
        this.CustomFormFooter.handleSetFieldValue('diskon_nominal', diskonNominalFooter);
        this.onCountFormFooter();
    }

    onCountFormFooter(): void {
        let qty = 0;
        let subtotal1 = 0;
        let biaya_barcode = 0;

        this.GridProps.dataSource.forEach((item) => {
            qty += parseFloat(item.qty);
            subtotal1 += parseFloat(item.sub_total);
            biaya_barcode += parseFloat(item.biaya_barcode);

            this.CustomFormFooter.handleSetFieldValue('qty', qty);
            this.CustomFormFooter.handleSetFieldValue('sub_total1', subtotal1);
            this.CustomFormFooter.handleSetFieldValue('total_biaya_barcode', biaya_barcode);
        });

        this.CustomFormFooter.handleSetFieldValue('sub_total2', subtotal1 - this.CustomFormFooter.handleGetFieldValue('diskon_nominal'));

        this.CustomFormFooter.handleSetFieldValue('ppn_nominal', this.CustomFormFooter.handleGetFieldValue('sub_total2') * (11 / 100));

        this.CustomFormFooter.handleSetFieldValue('total_transaksi', this.CustomFormFooter.handleGetFieldValue('sub_total2') + this.CustomFormFooter.handleGetFieldValue('ppn_nominal'))
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;
        header.keterangan = this.Keterangan.nativeElement.value;

        const footer = this.CustomFormFooter.handleSubmitForm();

        const payload = this._utilityService.JoinTwoObject(header, footer);

        this._store.dispatch(new PenerimaanKonsinyasiAction.Save(payload))
            .subscribe((result: any) => {
                if (result.penerimaan_konsinyasi.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['pembelian/konsinyasi/history']);
                    }, 1500);
                }
            });
    }
}
