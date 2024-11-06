import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { PemesananPoAction } from 'src/app/@shared/state/pembelian/pemesanan-po';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detail-pemesanan-po',
    templateUrl: './detail-pemesanan-po.component.html',
    styleUrls: ['./detail-pemesanan-po.component.scss']
})
export class DetailPemesananPoComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomFormHeader') CustomFormHeader!: CustomFormComponent

    GridProps: GridModel.IGrid;

    @ViewChild('Keterangan') Keterangan!: ElementRef;

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

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

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    GridStokDanOmsetProps: GridModel.IGrid;

    SelectedPemesanan: any;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key == 'Enter') {
            event.preventDefault();
            // Logika yang sama seperti sebelumnya
            const inputs = document.querySelectorAll('input');
            let currentIndex = Array.from(inputs).findIndex(input => document.activeElement === input);
            const nextIndex = (currentIndex + 1) % inputs.length;
            inputs[nextIndex].focus();
        }
    }

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _setupBarangService: SetupBarangService,
    ) {
        this.DashboardProps = {
            title: 'Detail Pemesanan PO',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_pemesanan_po_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_pemesanan',
                    label: 'Id Pemesanan',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'tanggal_pemesanan',
                    label: 'Tgl. Pemesanan',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tangal_expired_pemesanan',
                    label: 'Tgl. Expired',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_lokasi',
                    label: 'Lokasi',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'warehouse',
                    label: 'Warehouse',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_supplier',
                    label: 'Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tanggal_kirim',
                    label: 'Tgl. Kirim',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        };

        this.FormInputDetail = {
            title: 'Item',
            type: 'add',
            form_props: {
                id: 'form_pemesanan_po_detail',
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
                            url: `${environment.endpoint}/pembelian/lookup_barang?id_supplier=`,
                            callback: (data) => {
                                this.HargaOrder = data.harga_beli_terakhir ? parseFloat(data.harga_beli_terakhir) : 0;
                                this.FormDialog.CustomForm.CustomForms.get('harga_order')?.setValue(this.HargaOrder);
                                this.onGetSatuan(data.satuan);
                                this.getOmsetDanStokBarang(data.id_barang);
                            },
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
                        id: 'satuans',
                        label: 'Satuan',
                        status: 'insert',
                        type: 'string',
                        required: false,
                        hidden: true
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
                        prefix: '%',
                        prefix_position: 'right',
                        is_form_grouped: true,
                        numeric_callback: (data) => {
                            this.handleChangeDiskon1Persen(data);
                        },
                        form_grouped_props: {
                            id: 'diskon_nominal_1',
                            label: 'Diskon 1 (Rp. )',
                            status: 'readonly',
                            type: 'numeric',
                            prefix: 'Rp. ',
                            prefix_position: 'left',
                            required: true,
                        }
                    },
                    {
                        id: 'diskon_persen_2',
                        label: 'Diskon 2',
                        status: 'insert',
                        type: 'numeric',
                        prefix: '%',
                        prefix_position: 'right',
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
                            prefix: 'Rp. ',
                            prefix_position: 'left',
                            required: true,
                        }
                    },
                    {
                        id: 'diskon_persen_3',
                        label: 'Diskon 3',
                        status: 'insert',
                        type: 'numeric',
                        prefix: '%',
                        prefix_position: 'right',
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
                            prefix: 'Rp. ',
                            prefix_position: 'left',
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
                ],
                custom_class: 'grid-rows-6 grid-cols-2'
            },
            width: '70vw',
            showContent: true
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                {
                    field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.banyak },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.banyak = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                {
                    field: 'harga_order', headerName: 'HARGA ORDER', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    editable: true,
                    valueGetter: params => { return params.data.harga_order },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.harga_order = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                { field: 'diskon_persen_1', headerName: 'DISKON 1 (%)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_1', headerName: 'DISKON 1 (Rp)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_2', headerName: 'DISKON 2 (%)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_2', headerName: 'DISKON 2 (Rp)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_3', headerName: 'DISKON 3 (%)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_3', headerName: 'DISKON 3 (Rp)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty_bonus', headerName: 'QTY BONUS', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'nama_bonus', headerName: 'NAMA BONUS', width: 200, sortable: true, resizable: true }
            ],
            dataSource: [],
            height: "300px",
            showPaging: false,
            toolbar: ['Add', 'Edit']
        };

        this.GridStokDanOmsetProps = {
            column: [
                { field: 'nama_lokasi', headerName: 'NAMA LOKASI', flex: 150, sortable: true, resizable: true },
                { field: 'alamat', headerName: 'ALAMAT', flex: 200, sortable: true, resizable: true },
                {
                    field: 'jumlah_stok', headerName: 'STOK', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                {
                    field: 'last_omzet', headerName: 'OMSET', flex: 150, sortable: true, resizable: true, editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                },
            ],
            dataSource: [],
            height: "150px",
            toolbar: [],
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_pemesanan_po_footer',
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
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: true,
                    numeric_callback: (data) => {
                        console.log(data);
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
                    id: 'total_transaksi',
                    label: 'Grand Total',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-6 grid-cols-1',
        };
    }

    ngOnInit(): void {
        this.getPemesananPoById();
    }

    getPemesananPoById(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._store.dispatch(new PemesananPoAction.GetById(id))
            .pipe(
                map((result) => {
                    if (result.pemesanan_po.entities.success) {
                        return result.pemesanan_po.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.SelectedPemesanan = result;

                this.CustomFormHeader.props.default_value = result;
                this.CustomFormHeader.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.detail_pemesanan;

                this.Keterangan.nativeElement.value = result.keterangan;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();

                this.FormDialog.FormProps.fields[0].lookup_props!.url = `${environment.endpoint}/pembelian/lookup_barang?id_supplier=${result.id_supplier}`;
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['pembelian/pemesanan-po/history']);
                break;
            default:
                break;
        }
    }

    onToolbarClicked(args: any): void {
        switch (args.id) {
            case 'add':
                this.FormInputDetail.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                console.log(args);
                break;
            default:
                break;
        }
    }

    onCellFinishEditing(args: any[]): void {
        args = args.filter((data) => {
            let total_after_diskon_1 = 0,
                total_after_diskon_2 = 0,
                total_after_diskon_3 = 0;

            data.qty = parseFloat(data.banyak) * parseFloat(data.isi);
            data.harga_order = parseFloat(data.harga_order);

            data.diskon_persen_1 = parseFloat(data.diskon_persen_1);
            data.diskon_nominal_1 = (parseFloat(data.qty) * data.harga_order) * (data.diskon_persen_1 / 100);
            total_after_diskon_1 = (parseFloat(data.qty) * data.harga_order) - data.diskon_nominal_1;

            data.diskon_persen_2 = parseFloat(data.diskon_persen_2);
            data.diskon_nominal_2 = total_after_diskon_1 * (data.diskon_persen_2 / 100);
            total_after_diskon_2 = total_after_diskon_1 - data.diskon_nominal_2;

            data.diskon_persen_3 = parseFloat(data.diskon_persen_3);
            data.diskon_nominal_3 = total_after_diskon_2 * (data.diskon_persen_3 / 100);
            total_after_diskon_3 = total_after_diskon_2 - data.diskon_nominal_3;

            data.sub_total = total_after_diskon_3;

            return data;
        });

        console.log("args =>", args);

        // this.GridProps.dataSource = args;
        // this.onCountFormFooter();
    }

    onGetSatuan(data: SetupBarangModel.ISetupBarangSatuan[]): void {
        const index = this.FormDialog.CustomForm.props.fields.findIndex((item) => {
            return item.id == 'kode_satuan'
        });

        const satuanDatasource = data.map((item) => {
            return {
                name: item.nama_satuan,
                value: item.kode_satuan,
                isi: item.isi,
            }
        });

        this.FormDialog.CustomForm.props.fields[index].select_props = satuanDatasource;

        this.FormDialog.CustomForm.CustomForms.get('satuans')?.setValue(JSON.stringify(data));
    }

    private getOmsetDanStokBarang(id_barang: number) {
        this._setupBarangService
            .getOmsetDanStokBarangCabang(id_barang)
            .subscribe((result) => {
                this.GridStokDanOmsetProps.dataSource = result.data;
            })
    }

    onChangeSatuan(data: SetupBarangModel.ISetupBarangSatuan): void {
        this.FormDialog.CustomForm.handleSetFieldValue('isi', data.isi);
        this.FormDialog.CustomForm.handleSetFieldValue('qty', (this.Banyak * data.isi!));
        this.Qty = (this.Banyak * data.isi!);
        this.onCountSubtotal();
    }

    handleChangeBanyak(value: number): void {
        this.Banyak = value;
        this.onCountSubtotal();
    }

    handleChangeQty(value: number): void {
        this.Qty = value;
        this.onCountSubtotal();
    }

    handleChangeHargaOrder(value: number): void {
        this.HargaOrder = value;
        this.onCountSubtotal();
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
        data.id_pemesanan = this.SelectedPemesanan.id_pemesanan;
        data.diskon_nominal_1 = data.diskon_nominal_1 ? data.diskon_nominal_1 : 0;
        data.diskon_nominal_2 = data.diskon_nominal_2 ? data.diskon_nominal_2 : 0;
        data.diskon_nominal_3 = data.diskon_nominal_3 ? data.diskon_nominal_3 : 0;
        data.diskon_persen_1 = data.diskon_persen_1 ? data.diskon_persen_1 : 0;
        data.diskon_persen_2 = data.diskon_persen_2 ? data.diskon_persen_2 : 0;
        data.diskon_persen_3 = data.diskon_persen_3 ? data.diskon_persen_3 : 0;
        data.qty_bonus = data.qty_bonus ? data.qty_bonus : 0;

        // this.GridProps.dataSource = [...this.GridProps.dataSource, data];

        console.log("payload =>", JSON.stringify(data));

        this.FormDialog.onCloseFormDialog();
    }

    handleCloseFormDetail(args: any): void {
        if (args == 'closed') {
            this.GridStokDanOmsetProps.dataSource = [];
        }
    }

    private onCountSubtotal() {
        const value = this.FormDialog.CustomForm.CustomForms.value;
        this.FormDialog.CustomForm.CustomForms.get('qty')?.setValue(value.isi * value.banyak);
        this.FormDialog.CustomForm.CustomForms.get('sub_total')?.setValue(value.qty * value.harga_order);
    }
}
