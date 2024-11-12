import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { PembelianDenganPoService } from 'src/app/@core/service/pembelian/pembelian-dengan-po/pembelian-dengan-po.service';
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

@Component({
    selector: 'app-detail-penerimaan-dengan-po',
    templateUrl: './detail-penerimaan-dengan-po.component.html',
    styleUrls: ['./detail-penerimaan-dengan-po.component.scss']
})
export class DetailPenerimaanDenganPoComponent implements OnInit, AfterViewInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    @ViewChild('Keterangan') Keterangan!: ElementRef;

    FormInputFooter: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    GridProps: GridModel.IGrid = {} as any;
    GridSelectedData: any = {} as any;
    GridSelectedIndex: number = 0;
    GridDatasource: any[] = [];

    is_ppn = false;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _confirmationService: ConfirmationService,
        private _pembelianDenganPoService: PembelianDenganPoService
    ) {
        this.DashboardProps = {
            title: 'Detail Penerimaan Dengan PO',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_penerimaan_dengan_po_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_penerimaan',
                    label: 'Id Penerimaan',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'id_supplier',
                    label: 'Id Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'no_nota',
                    label: 'No. Nota',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tanggal_nota',
                    label: 'Tgl. Nota',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nomor_pemesanan',
                    label: 'Faktur Pemesanan',
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
                    numeric_max_number: 100,
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'sub_total1',
                    label: 'Subtotal 1',
                    status: 'readonly',
                    numeric_max_number: 100,
                    type: 'numeric',
                    required: true,
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
                    numeric_step_number: 0.5,
                    numeric_mode: 'decimal',
                    numeric_callback: (data) => {
                        this.handleChangeDiskonFooter(data);
                    },
                    form_grouped_props: {
                        id: 'diskon_nominal',
                        label: 'Diskon',
                        status: 'insert',
                        type: 'numeric',
                        prefix: 'Rp.',
                        prefix_position: 'left',
                        required: true,
                        numeric_callback: (data) => {
                            this.handleChangeDiskonNominalFooter(data);
                        }
                    },
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
                    numeric_mode: 'decimal',
                    required: true,
                },
                {
                    id: 'potongan',
                    label: 'Potongan',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    numeric_mode: 'decimal',
                    numeric_callback: (data) => {
                        this.onCountFormFooter();
                    },
                },
                {
                    id: 'pembulatan',
                    label: 'Pembulatan',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    numeric_mode: 'decimal',
                    numeric_callback: (data) => {
                        this.onCountFormFooter();
                    },
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
                    hidden: true,
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
                { field: 'isi', headerName: 'ISI', width: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true },
                {
                    field: 'harga_order', headerName: 'HARGA ORDER', width: 180, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.harga_order },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.harga_order = params.newValue;
                        params.data = data;
                        return true;
                    }
                },
                {
                    field: 'diskon_persen_1', headerName: 'DISKON 1 (%)', width: 180, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.diskon_persen_1 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_persen_1 = params.newValue <= 100 ? params.newValue : 100;
                        params.data = data;
                        return true;
                    }
                },
                { field: 'diskon_nominal_1', headerName: 'DISKON 1 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                {
                    field: 'diskon_persen_2', headerName: 'DISKON 2 (%)', width: 180, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.diskon_persen_2 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_persen_2 = params.newValue <= 100 ? params.newValue : 100;
                        params.data = data;
                        return true;
                    }
                },
                { field: 'diskon_nominal_2', headerName: 'DISKON 2 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                {
                    field: 'diskon_persen_3', headerName: 'DISKON 3 (%)', width: 180, sortable: true, resizable: true, editable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                    valueGetter: params => { return params.data.diskon_persen_3 },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.diskon_persen_3 = params.newValue <= 100 ? params.newValue : 100;
                        params.data = data;
                        return true;
                    }
                },
                { field: 'diskon_nominal_3', headerName: 'DISKON 3 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty_bonus', headerName: 'QTY BONUS', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'nama_bonus', headerName: 'NAMA BONUS', width: 180, sortable: true, resizable: true },
                {
                    field: 'biaya_barcode', headerName: 'BIAYA BARCODE', width: 180, sortable: true, resizable: true, editable: true,
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
    }

    ngOnInit(): void {
        this.onGetLokasi();
        this.onGetWarehouse();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getPenerimaanDenganPoById();

        }, 100);
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

    getPenerimaanDenganPoById(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._store.dispatch(new PembelianDenganPoAction.GetById(id))
            .pipe(
                map((result) => {
                    if (result.pembelian_dengan_po.entities.success) {
                        return result.pembelian_dengan_po.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.CustomForm.props.default_value = result;
                this.CustomForm.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.detail;

                this.Keterangan.nativeElement.value = result.keterangan;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();

                if (result.status_penerimaan == 'OPEN') {
                    this.DashboardProps = {
                        title: 'Detail Penerimaan Dengan PO',
                        button_navigation: [
                            {
                                id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs'
                            },
                            {
                                id: 'update', caption: 'Update', icon: 'pi pi-pencil text-xs'
                            },
                            {
                                id: 'validasi', caption: 'Validasi', icon: 'pi pi-check text-xs'
                            }
                        ],
                    };
                }

                if (result.status_penerimaan == 'VALIDATED') {
                    this.DashboardProps = {
                        title: 'Detail Penerimaan Dengan PO',
                        button_navigation: [
                            {
                                id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs'
                            },
                            {
                                id: 'cancel', caption: 'Cancel', icon: 'pi pi-ban text-xs'
                            },
                        ],
                    };
                };

                if (result.status_penerimaan == 'CANCEL') {
                    this.DashboardProps = {
                        title: 'Detail Penerimaan Dengan PO',
                        button_navigation: [
                            {
                                id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs'
                            },
                        ],
                    };
                };

                this.onCountFormFooter();
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['pembelian/penerimaan-dengan-po/history']);
                break;
            case 'update':
                this.onEditPenerimaanDenganPo(this.GridProps.dataSource);
                break;
            case 'validasi':
                this.handleSubmitForm();
                break;
            case 'cancel':
                this._confirmationService.confirm({
                    target: (<any>event).target as EventTarget,
                    message: 'Apakah Anda Yakin? ',
                    header: 'Data Akan Dibatalkan',
                    icon: 'pi pi-question-circle',
                    acceptButtonStyleClass: "p-button-info p-button-sm",
                    rejectButtonStyleClass: "p-button-secondary p-button-sm",
                    acceptIcon: "none",
                    acceptLabel: 'Iya, Saya Yakin',
                    rejectIcon: "none",
                    rejectLabel: 'Tidak',
                    accept: () => {
                        this._pembelianDenganPoService
                            .cancel(this._activatedRoute.snapshot.params.id)
                            .subscribe((result) => {
                                if (result.success) {
                                    this._messageService.clear();
                                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dibatalkan' });

                                    setTimeout(() => {
                                        this._router.navigateByUrl('pembelian/penerimaan-dengan-po/history');
                                    }, 2000);
                                }
                            })
                    },
                });
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
            case 'delete':
                const selectedIndex = this.GridProps.dataSource.findIndex((item) => { return item.urut == args.data.urut });
                const data = this.GridProps.dataSource.filter((item, index) => {
                    return index != selectedIndex;
                });
                this.onEditPenerimaanDenganPo(data);
                break;
            case 'update':
                this.onEditPenerimaanDenganPo(this.GridProps.dataSource);
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

        this.GridProps.dataSource = args;
        this.onEditPenerimaanDenganPo(args);
    }

    private onEditPenerimaanDenganPo(detail: any) {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = detail;
        header.keterangan = this.Keterangan.nativeElement.value;
        header.is_ppn = this.is_ppn;
        header.is_item_include_ppn = false;
        header.is_update_harga_order = false;

        const footer = this.CustomFormFooter.handleSubmitForm();
        const payload = this._utilityService.JoinTwoObject(header, footer);

        this._pembelianDenganPoService
            .edit(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data berhasil diperbarui' });
                    this.getPenerimaanDenganPoById();
                }
            });
    }

    handleChangeDiskonFooter(value: number): void {
        const diskonNominalFooter = parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total1')) * (value / 100);
        this.CustomFormFooter.handleSetFieldValue('diskon_nominal', diskonNominalFooter);
        this.onCountFormFooter();
    }

    handleChangeDiskonNominalFooter(value: number): void {
        const diskonPersenFooter = (value / parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total1'))) * 100;
        this.CustomFormFooter.handleSetFieldValue('diskon_persen', diskonPersenFooter);
        this.onCountFormFooter();
    }

    onCountFormFooter(): void {
        this.CustomFormFooter.handleSetFieldValue('sub_total2', parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total1')) - parseFloat(this.CustomFormFooter.handleGetFieldValue('diskon_nominal')));

        if (this.is_ppn) {
            this.CustomFormFooter.handleSetFieldValue('ppn_nominal', parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total2')) * (11 / 100));
        } else {
            this.CustomFormFooter.handleSetFieldValue('ppn_nominal', 0);
        }

        const ppn_nominal = parseFloat(this.CustomFormFooter.handleGetFieldValue('ppn_nominal')),
            potongan = parseFloat(this.CustomFormFooter.handleGetFieldValue('potongan')),
            pembulatan = parseFloat(this.CustomFormFooter.handleGetFieldValue('pembulatan'));

        this.CustomFormFooter.handleSetFieldValue('total_transaksi', parseFloat(this.CustomFormFooter.handleGetFieldValue('sub_total2')) + ppn_nominal - potongan + pembulatan);
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;

        const footer = this.CustomFormFooter.handleSubmitForm();

        const payload = this._utilityService.JoinTwoObject(header, footer);

        this._store.dispatch(new PembelianDenganPoAction.Validasi(payload))
            .subscribe((result) => {
                if (result.pembelian_dengan_po.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Divalidasi' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['pembelian/penerimaan-dengan-po/history']);
                    }, 1500);
                }
            });
    }
}
