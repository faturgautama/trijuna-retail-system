import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PembelianTanpaPoModel } from 'src/app/@shared/models/pembelian/pembelian-tanpa-po.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { PembelianTanpaPoAction } from 'src/app/@shared/state/pembelian/pembelian-tanpa-po';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';

@Component({
    selector: 'app-detail-penerimaan-tanpa-po',
    templateUrl: './detail-penerimaan-tanpa-po.component.html',
    styleUrls: ['./detail-penerimaan-tanpa-po.component.scss']
})
export class DetailPenerimaanTanpaPoComponent implements OnInit, AfterViewInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    @ViewChild('Keterangan') Keterangan!: ElementRef;

    FormInputFooter: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    GridProps: GridModel.IGrid = {} as any;
    GridSelectedData: PembelianTanpaPoModel.IPembelianTanpaPoDetail = {} as any;
    GridSelectedIndex: number = 0;
    GridDatasource: any[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
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
                    id: 'nomor_penerimaan',
                    label: 'Faktur Penerimaan',
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
                    // numeric_callback: (data) => {
                    //     this.handleChangeDiskonFooter(data);
                    // },
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
                {
                    id: 'total_biaya_barcode',
                    label: 'Total Biaya Barcode',
                    status: 'readonly',
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
                { field: 'isi', headerName: 'ISI', width: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true },
                {
                    field: 'harga_order', headerName: 'HARGA ORDER', width: 180, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                {
                    field: 'diskon_persen_1', headerName: 'DISKON 1 (%)', width: 180, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                { field: 'diskon_nominal_1', headerName: 'DISKON 1 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                {
                    field: 'diskon_persen_2', headerName: 'DISKON 2 (%)', width: 180, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
                { field: 'diskon_nominal_2', headerName: 'DISKON 2 (Rp)', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                {
                    field: 'diskon_persen_3', headerName: 'DISKON 3 (%)', width: 180, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e },
                },
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
        };
    }

    ngOnInit(): void {
        this.onGetLokasi();
        this.onGetWarehouse();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getPenerimaanTanpaPoById();
        }, 100);
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

    getPenerimaanTanpaPoById(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._store
            .dispatch(new PembelianTanpaPoAction.GetById(id))
            .pipe(
                map((result: any) => {
                    if (result.pembelian_tanpa_po.entities.success) {
                        return result.pembelian_tanpa_po.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result: any) => {
                this.CustomForm.props.default_value = result;
                this.CustomForm.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.detail;

                this.Keterangan.nativeElement.value = result.keterangan;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();

                if (result.status_penerimaan == 'OPEN') {
                    this.DashboardProps.button_navigation.push({
                        id: 'validasi', caption: 'Validasi', icon: 'pi pi-check text-xs'
                    })
                }
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['pembelian/penerimaan-tanpa-po/history']);
                break;
            case 'validasi':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
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
        const id_pemesanan = this.CustomForm.handleGetFieldValue('id_penerimaan');

        this._store.dispatch(new PembelianTanpaPoAction.Validasi(id_pemesanan))
            .subscribe((result: any) => {
                if (result.pembelian_tanpa_po.entities.success) {
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
