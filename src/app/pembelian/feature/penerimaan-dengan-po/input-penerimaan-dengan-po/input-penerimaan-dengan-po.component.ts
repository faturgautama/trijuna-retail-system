import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { hostname } from 'os';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map, takeUntil } from 'rxjs';
import { PembelianDenganPoService } from 'src/app/@core/service/pembelian/pembelian-dengan-po/pembelian-dengan-po.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { GridComponent } from 'src/app/@shared/components/grid/grid.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
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
export class InputPenerimaanDenganPoComponent implements OnInit, AfterViewInit, OnDestroy {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    FormInputFooter: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    @ViewChild('GridComps') GridComps!: GridComponent;
    GridProps: GridModel.IGrid = {} as any;
    GridSelectedData: PembelianDenganPoModel.IPembelianDenganPoDetail = {} as any;
    GridSelectedIndex: number = 0;
    GridDatasource: any[] = [];

    @ViewChild('FormDialogSatuan') FormDialogSatuan!: FormDialogComponent;
    FormDialogSatuanProps: DialogModel.IFormDialog;

    // ** Footer
    @ViewChild('Keterangan') Keterangan!: ElementRef;

    is_ppn = false;
    is_item_include_ppn = false;
    is_update_harga_order = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _confirmationService: ConfirmationService,
        private _pembelianDenganPoService: PembelianDenganPoService,
    ) {
        this.DashboardProps = {
            title: 'Input Penerimaan Dengan PO',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'print_draft', caption: 'Print Draft', icon: 'pi pi-print text-xs' },
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
                    numeric_mode: 'decimal',
                    required: true,
                },
                {
                    id: 'sub_total1',
                    label: 'Subtotal 1',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'diskon_persen',
                    label: 'Diskon',
                    status: 'insert',
                    type: 'numeric',
                    prefix: '%',
                    prefix_position: 'right',
                    required: true,
                    is_form_grouped: true,
                    numeric_max_number: 100,
                    numeric_step_number: 0.1,
                    numeric_mode: 'decimal',
                    numeric_callback: (data) => {
                        console.log("data =>", data);
                        this.handleChangeDiskonFooter(data);
                    },
                    form_grouped_props: {
                        id: 'diskon_nominal',
                        label: 'Diskon',
                        status: 'readonly',
                        type: 'numeric',
                        prefix: 'Rp. ',
                        prefix_position: 'left',
                        required: true,
                    },
                    hidden: true,
                },
                {
                    id: 'sub_total2',
                    label: 'Subtotal 2',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'ppn_nominal',
                    label: 'PPn',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    numeric_callback: (data) => {
                        // this.CustomFormFooter.handleSetFieldValue('total_transaksi', this.CustomFormFooter.handleGetFieldValue('sub_total2') + data);
                    },
                    hidden: true,
                },
                {
                    id: 'potongan',
                    label: 'Potongan',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    numeric_callback: (data) => {
                        const subtotal2 = this.CustomFormFooter.handleGetFieldValue('sub_total2'),
                            ppn_nominal = this.CustomFormFooter.handleGetFieldValue('ppn_nominal'),
                            pembulatan = this.CustomFormFooter.handleGetFieldValue('pembulatan');

                        this.CustomFormFooter.handleSetFieldValue('total_transaksi', subtotal2 + ppn_nominal - data + pembulatan);
                    },
                    hidden: true,
                },
                {
                    id: 'pembulatan',
                    label: 'Pembulatan',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    numeric_callback: (data) => {
                        const subtotal2 = this.CustomFormFooter.handleGetFieldValue('sub_total2'),
                            ppn_nominal = this.CustomFormFooter.handleGetFieldValue('ppn_nominal'),
                            potongan = this.CustomFormFooter.handleGetFieldValue('potongan');

                        this.CustomFormFooter.handleSetFieldValue('total_transaksi', subtotal2 + ppn_nominal - potongan + data);
                    },
                    hidden: true,
                },
                {
                    id: 'total_transaksi',
                    label: 'Grand Total',
                    status: 'readonly',
                    type: 'numeric',
                    numeric_mode: 'decimal',
                    required: true,
                },
                {
                    id: 'total_biaya_barcode',
                    label: 'Total Biaya Barcode',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    hidden: true
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-1',
        }

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_pemesanan', headerName: 'ID PEMESANAN', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'id_pemesanan_detail', headerName: 'ID PEMESANAN DETAIL', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                {
                    field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.banyak },
                    valueSetter: params => {
                        if (parseInt(params.newValue) > parseInt(params.data.qty_po)) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'warn', summary: 'Oops', detail: 'Tidak Boleh > Qty PO' });

                            const index = this.GridProps.dataSource.findIndex(item => item.id_pemesanan_detail == params.data.id_pemesanan_detail);
                            let dataSource = [...this.GridProps.dataSource];
                            dataSource[index].banyak = params.oldValue;

                            setTimeout(() => {
                                this.GridProps.dataSource = dataSource;
                            }, 1000);

                        } else {
                            const data = JSON.parse(JSON.stringify(params.data));
                            data.banyak = params.newValue;
                            params.data = data;
                        }

                        return true;
                    }
                },
                {
                    field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true,
                    onCellClicked: (args: any) => {
                        this.GridSelectedIndex = args.rowIndex;

                        this.FormDialogSatuan.onOpenFormDialog();

                        const select_props = args.data.satuan.map((item: any) => {
                            return {
                                name: item.kode_satuan,
                                value: item.kode_satuan,
                                isi: item.isi,
                            }
                        });

                        this.FormDialogSatuan.CustomForm.props.fields[0].select_props = select_props;
                    }
                },
                { field: 'isi', headerName: 'ISI', width: 150, sortable: true, resizable: true, },
                {
                    field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true
                },
                {
                    field: 'harga_order', headerName: 'HARGA ORDER', width: 180, sortable: true, resizable: true, editable: true,
                    hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    valueGetter: params => { return params.data.harga_order },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.harga_order = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_persen_1', headerName: 'DISKON 1 (%)', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.diskon_persen_1 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_persen_1 = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_nominal_1', headerName: 'DISKON 1 (Rp)', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    valueGetter: params => { return params.data.diskon_nominal_1 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_nominal_1 = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_persen_2', headerName: 'DISKON 2 (%)', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.diskon_persen_2 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_persen_2 = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_nominal_2', headerName: 'DISKON 2 (Rp)', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    valueGetter: params => { return params.data.diskon_nominal_2 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_nominal_2 = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_persen_3', headerName: 'DISKON 3 (%)', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.diskon_persen_3 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_persen_3 = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_nominal_3', headerName: 'DISKON 3 (Rp)', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    valueGetter: params => { return params.data.diskon_nominal_3 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_nominal_3 = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e }, hide: true, },
                { field: 'qty_bonus', headerName: 'QTY BONUS', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'nama_bonus', headerName: 'NAMA BONUS', width: 180, sortable: true, resizable: true, hide: true, },
                {
                    field: 'biaya_barcode', headerName: 'BIAYA BARCODE', width: 180, sortable: true, resizable: true, editable: true, hide: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.biaya_barcode },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.biaya_barcode = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
            ],
            dataSource: [],
            height: "250px",
            showPaging: false,
            toolbar: ['Delete']
        };

        this.FormDialogSatuanProps = {
            title: 'Satuan',
            type: 'edit',
            form_props: {
                id: 'form_edit_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'kode_satuan',
                        label: 'Satuan',
                        status: 'insert',
                        type: 'select',
                        select_props: [],
                        select_callback: (data: any) => {
                            this.FormDialogSatuan.CustomForm.handleSetFieldValue('isi', data.isi);
                        },
                        required: true,
                    },
                    {
                        id: 'isi',
                        label: 'Isi',
                        status: 'readonly',
                        type: 'string',
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-2'
            }
        };
    }

    ngOnInit(): void {
        this.onGetLokasi();
        this.onGetWarehouse();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            const id = this._activatedRoute.snapshot.params.id;

            if (id) {
                this._pembelianDenganPoService
                    .getById(id)
                    .subscribe((result) => {
                        if (result.success) {
                            result.data.tanggal_nota = new Date(result.data.tanggal_nota);

                            const lookupFakturPoInputResult = document.getElementById('lookupFakturPoInputResult') as HTMLInputElement;
                            lookupFakturPoInputResult.value = result.data.nomor_pemesanan;

                            result.data.diskon_nominal = parseFloat(result.data.diskon_nominal);
                            result.data.diskon_persen = parseFloat(result.data.diskon_persen);
                            result.data.pembulatan = parseFloat(result.data.pembulatan);
                            result.data.potongan = parseFloat(result.data.potongan ? result.data.potongan : 0);
                            result.data.ppn_nominal = parseFloat(result.data.ppn_nominal);
                            result.data.qty = parseFloat(result.data.qty);
                            result.data.sub_total1 = parseFloat(result.data.sub_total1);
                            result.data.sub_total2 = parseFloat(result.data.sub_total2);
                            result.data.total_transaksi = parseFloat(result.data.total_transaksi);

                            this.CustomForm.CustomForms.patchValue(result.data);
                            this.CustomFormFooter.CustomForms.patchValue(result.data);
                            this.GridProps.dataSource = result.data.detail.map((item: any) => {
                                delete item.id_penerimaan;
                                delete item.id_penerimaan_detail;

                                item.id_pemesanan = result.data.id_pemesanan;

                                return item;
                            });
                        }
                    })
            }

        }, 1000);
    }

    ngOnDestroy(): void {
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
            case 'print_draft':
                const header = this.CustomForm.handleSubmitForm();
                header.detail = this.GridProps.dataSource;
                const footer = this.CustomFormFooter.handleSubmitForm();
                const payload = this._utilityService.JoinTwoObject(header, footer);
                localStorage.setItem('_PRINT_DRAFT_PEMBELIAN_PO_', JSON.stringify(payload));
                setTimeout(() => {
                    const url = this._router.serializeUrl(
                        this._router.createUrlTree(['pembelian/penerimaan-dengan-po/print_draft'])
                    );

                    window.open(`/#${url}`, '_blank');

                }, 1000);
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
                this.GridProps.dataSource = result.map((item: any) => {
                    return {
                        ...item,
                        qty_po: item.qty
                    }
                });
                this.onCountFormFooter();
            })
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onToolbarClicked(args: any): void {
        switch (args.id) {
            case 'delete':
                const selectedIndex = this.GridProps.dataSource.findIndex((item) => { return item.urut == this.GridSelectedData.urut });
                this.GridComps.onDeleteClientSide(selectedIndex);
                this.onCountFormFooter();
                break;
            default:
                break;
        }
    }

    handleSubmitFormSatuan(args: any): void {
        const gridDatasource = JSON.parse(JSON.stringify(this.GridProps.dataSource));

        gridDatasource[this.GridSelectedIndex].kode_satuan = args.kode_satuan;
        gridDatasource[this.GridSelectedIndex].isi = args.isi;

        const banyak = parseFloat(gridDatasource[this.GridSelectedIndex].banyak);

        gridDatasource[this.GridSelectedIndex].qty = banyak * args.isi;

        gridDatasource[this.GridSelectedIndex].sub_total = gridDatasource[this.GridSelectedIndex].qty * parseFloat(gridDatasource[this.GridSelectedIndex].harga_order);

        this.GridProps.dataSource = gridDatasource;

        this.FormDialogSatuan.onCloseFormDialog();

        this.onCountFormFooter();
    }

    onCellFinishEditing(args: any[]): void {
        args = args.filter((data) => {
            let total_after_diskon_1 = 0,
                total_after_diskon_2 = 0,
                total_after_diskon_3 = 0;

            data.qty = parseFloat(data.banyak) * parseFloat(data.isi);
            data.harga_order = parseFloat(data.harga_order);

            let total = data.qty * data.harga_order;

            data.diskon_persen_1 = parseFloat(data.diskon_persen_1);
            data.diskon_nominal_1 = parseFloat(total * (data.diskon_persen_1 / 100) as any);

            console.log("diskon nominal 1 =>", data.diskon_nominal_1);

            total_after_diskon_1 = parseFloat((total - data.diskon_nominal_1) as any);

            data.diskon_persen_2 = parseFloat(data.diskon_persen_2);
            data.diskon_nominal_2 = total_after_diskon_1 * (data.diskon_persen_2 / 100);
            total_after_diskon_2 = total_after_diskon_1 - data.diskon_nominal_2;

            data.diskon_persen_3 = parseFloat(data.diskon_persen_3);
            data.diskon_nominal_3 = total_after_diskon_2 * (data.diskon_persen_3 / 100);
            total_after_diskon_3 = total_after_diskon_2 - data.diskon_nominal_3;

            data.sub_total = total_after_diskon_3;

            return data;
        });

        this.GridProps.dataSource = args;

        setTimeout(() => {
            this.onCountFormFooter();
        }, 1500);
    }

    handleChangeDiskonFooter(value: number): void {
        const diskonNominalFooter = this.CustomFormFooter.handleGetFieldValue('sub_total1') * (value / 100);
        this.CustomFormFooter.handleSetFieldValue('diskon_nominal', diskonNominalFooter);
        this.onCountFormFooter();
    }

    handleChangeWithPpn(args: any): void {
        if (args.value) {
            this.CustomFormFooter.handleSetFieldValue('ppn_nominal', this.CustomFormFooter.handleGetFieldValue('sub_total2') * (11 / 100));
        } else {
            this.CustomFormFooter.handleSetFieldValue('ppn_nominal', 0);
        };

        const subtotal2 = this.CustomFormFooter.handleGetFieldValue('sub_total2'),
            potongan = this.CustomFormFooter.handleGetFieldValue('potongan'),
            pembulatan = this.CustomFormFooter.handleGetFieldValue('pembulatan');

        this.CustomFormFooter.handleSetFieldValue('total_transaksi', subtotal2 + args.value - potongan + pembulatan);
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

        this.CustomFormFooter.handleSetFieldValue('sub_total2', subtotal1 - parseFloat(this.CustomFormFooter.handleGetFieldValue('diskon_nominal')));

        if (this.is_ppn) {
            this.CustomFormFooter.handleSetFieldValue('ppn_nominal', parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total2')) * (11 / 100));
        }

        const ppn_nominal = this.CustomFormFooter.handleGetFieldValue('ppn_nominal'),
            potongan = this.CustomFormFooter.handleGetFieldValue('potongan'),
            pembulatan = this.CustomFormFooter.handleGetFieldValue('pembulatan');

        this.CustomFormFooter.handleSetFieldValue('total_transaksi', parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total2')) + ppn_nominal - potongan + pembulatan);
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;
        header.keterangan = this.Keterangan.nativeElement.value;
        header.is_ppn = this.is_ppn;
        header.is_item_include_ppn = this.is_item_include_ppn;
        header.is_update_harga_order = this.is_update_harga_order;

        const footer = this.CustomFormFooter.handleSubmitForm();
        const payload = this._utilityService.JoinTwoObject(header, footer);

        console.log("payload =>", payload);

        this._confirmationService.confirm({
            target: (<any>event).target as EventTarget,
            message: 'Apakah Anda Ingin Mencetak Juga? ',
            header: 'Data Akan Disimpan',
            icon: 'pi pi-question-circle',
            acceptButtonStyleClass: "p-button-info p-button-sm",
            rejectButtonStyleClass: "p-button-secondary p-button-sm",
            acceptIcon: "none",
            acceptLabel: 'Iya, Cetak Juga',
            rejectIcon: "none",
            rejectLabel: 'Tidak, Simpan Saja',
            accept: () => {
                this.onSaveWithConditionPrint(true, payload)
            },
            reject: (args: any) => {
                if (args == 1) {
                    this.onSaveWithConditionPrint(false, payload)
                }
            },
        });
    }

    private onSaveWithConditionPrint(print: boolean, payload: any) {
        this._store
            .dispatch(new PembelianDenganPoAction.Save(payload))
            .subscribe((result) => {
                if (result.pembelian_dengan_po.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    localStorage.removeItem('_PRINT_DRAFT_PEMBELIAN_PO_');

                    if (print) {
                        setTimeout(() => {
                            this._router.navigate([`pembelian/penerimaan-dengan-po/print/${result.pembelian_dengan_po.entities.data}`]);
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            this._router.navigate([`pembelian/penerimaan-dengan-po/history`]);
                        }, 1500);
                    }
                }
            });
    }
}

