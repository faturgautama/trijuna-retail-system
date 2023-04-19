import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PembelianDenganPoModel } from 'src/app/@shared/models/pembelian/pembelian-dengan-po.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { PembelianDenganPoAction } from 'src/app/@shared/state/pembelian/pembelian-dengan-po';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-penerimaan-dengan-po',
    templateUrl: './input-penerimaan-dengan-po.component.html',
    styleUrls: ['./input-penerimaan-dengan-po.component.scss']
})
export class InputPenerimaanDenganPoComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    FormInputFooter: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    GridProps: GridModel.IGrid = {} as any;
    GridSelectedData: PembelianDenganPoModel.IPembelianDenganPoDetail = {} as any;

    PrimeGridProps: GridModel.IPrimeGrid = {} as any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Input Penerimaan Dengan PO',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_penerimaan_dengan_po_header',
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
                    id: 'id_pemesanan',
                    label: 'Faktur Pemesanan',
                    status: 'insert',
                    type: 'lookup',
                    lookup_props: {
                        id: 'lookupFakturPo',
                        title: 'Data Pemesanan PO',
                        columns: [
                            { field: 'nomor_pemesanan', width: 200, headerName: 'NO. PEMESANAN', sortable: true, resizable: true },
                            { field: 'tanggal_pemesanan', width: 275, headerName: 'TGL. PEMESANAN', sortable: true, resizable: true },
                            { field: 'nama_supplier', width: 290, headerName: 'SUPPLIER', sortable: true, resizable: true },
                        ],
                        filter: [
                            { id: 'nomor_pemesanan', title: 'No. Pemesanan', type: 'contain', value: 'ms.nomor_pemesanan' },
                            { id: 'kode_supplier', title: 'Kode Supplier', type: 'contain', value: 'ms.kode_supplier' },
                            { id: 'nama_supplier', title: 'Nama Supplier', type: 'contain', value: 'ms.nama_supplier' },
                        ],
                        label: 'No. Pemesanan',
                        selectedField: 'nomor_pemesanan',
                        selectedValue: 'id_pemesanan',
                        url: `${environment.endpoint}/penerimaan_dengan_po/lookup_pemesanan`,
                        callback: (data) => {
                            this.onGetDetailPemesananPo(data.id_pemesanan);
                        }
                    },
                    lookup_set_value_field: ['id_lokasi', 'id_warehouse', 'nama_supplier'],
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

        this.FormInputFooter = {
            id: 'form_penerimaan_dengan_po_footer',
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
        }

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
                {
                    field: 'isi', headerName: 'ISI', width: 200, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.isi },
                    valueSetter: params => {
                        params.data.isi = params.newValue;
                        return true;
                    }
                },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_order', headerName: 'HARGA ORDER', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
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
            height: "250px",
            showPaging: false,
        };

        this.PrimeGridProps = {
            column: [
                { field: 'urut', header: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_pemesanan', header: 'ID PEMESANAN', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'id_pemesanan_detail', header: 'ID PEMESANAN DETAIL', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'id_barang', header: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', header: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'barcode', header: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'banyak', header: 'BANYAK', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', header: 'SATUAN', width: 150, sortable: true, resizable: true },
                {
                    field: 'isi', header: 'ISI', width: 200, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                { field: 'qty', header: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_order', header: 'HARGA ORDER', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_1', header: 'DISKON 1 (%)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_1', header: 'DISKON 1 (Rp)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_2', header: 'DISKON 2 (%)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_2', header: 'DISKON 2 (Rp)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'diskon_persen_3', header: 'DISKON 3 (%)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'diskon_nominal_3', header: 'DISKON 3 (Rp)', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', header: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty_bonus', header: 'QTY BONUS', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'nama_bonus', header: 'NAMA BONUS', width: 200, sortable: true, resizable: true }
            ],
            dataSource: [],
            height: "250px",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        this.onGetLokasi();
        this.onGetWarehouse();
    }

    onGetLokasi(): void {
        this._store.dispatch(new SetupLokasiAction.GetAll())
            .pipe(
                map((result) => {
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
                map((result) => {
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
                this._router.navigate(['pembelian/penerimaan-dengan-po/history']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    onGetDetailPemesananPo(id_pemesanan: number): void {
        this._store.dispatch(new PembelianDenganPoAction.GetDetailPemesanan(id_pemesanan))
            .pipe(
                map((result) => {
                    if (result.pembelian_dengan_po.entities.status) {
                        return result.pembelian_dengan_po.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.PrimeGridProps.dataSource = result;

                this.onCountFormFooter();
            })
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    handleChangeDiskonFooter(value: number): void {
        const diskonNominalFooter = this.CustomFormFooter.handleGetFieldValue('sub_total1') * (value / 100);
        this.CustomFormFooter.handleSetFieldValue('diskon_nominal', diskonNominalFooter);
        this.onCountFormFooter();
    }

    onCountFormFooter(): void {
        let qty = 0;
        let subtotal1 = 0;

        this.GridProps.dataSource.forEach((item) => {
            qty += parseFloat(item.qty);
            subtotal1 += parseFloat(item.sub_total);

            this.CustomFormFooter.handleSetFieldValue('qty', qty);
            this.CustomFormFooter.handleSetFieldValue('sub_total1', subtotal1);
        });

        this.CustomFormFooter.handleSetFieldValue('sub_total2', subtotal1 - this.CustomFormFooter.handleGetFieldValue('diskon_nominal'));

        this.CustomFormFooter.handleSetFieldValue('ppn_nominal', this.CustomFormFooter.handleGetFieldValue('sub_total2') * (11 / 100));

        this.CustomFormFooter.handleSetFieldValue('total_transaksi', this.CustomFormFooter.handleGetFieldValue('sub_total2') + this.CustomFormFooter.handleGetFieldValue('ppn_nominal'))
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;

        const footer = this.CustomFormFooter.handleSubmitForm();

        const payload = this._utilityService.JoinTwoObject(header, footer);

        console.log(payload);

        // this._store.dispatch(new PembelianDenganPoAction.Save(payload))
        //     .subscribe((result) => {
        //         if (result.pemesanan_po.entities.success) {
        //             this._messageService.clear();
        //             this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

        //             this.CustomForm.handleResetForm();

        //             setTimeout(() => {
        //                 this._router.navigate(['pembelian/pemesanan-po/history']);
        //             }, 1500);
        //         }
        //     });
    }
}

