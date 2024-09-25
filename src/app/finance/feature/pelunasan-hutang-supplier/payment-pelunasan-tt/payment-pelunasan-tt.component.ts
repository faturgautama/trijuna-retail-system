import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { PelunasanHutangSupplierService } from 'src/app/@core/service/finance/pelunasan-hutang-supplier/pelunasan-hutang-supplier.service';
import { SetupRekeningOwnerService } from 'src/app/@core/service/finance/setup-data/setup-rekening-owner.service';
import { TitipTagihanService } from 'src/app/@core/service/finance/titip-tagihan/titip-tagihan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-payment-pelunasan-tt',
    templateUrl: './payment-pelunasan-tt.component.html',
    styleUrls: ['./payment-pelunasan-tt.component.scss']
})
export class PaymentPelunasanTtComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    FormInputDialog: CustomFormModel.IForm;
    @ViewChild('CustomFormDialog') CustomFormDialog!: CustomFormComponent

    FormInputPaymentDialog: CustomFormModel.IForm;
    @ViewChild('CustomFormPaymentDialog') CustomFormPaymentDialog!: CustomFormComponent

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

    GridReturProps: GridModel.IGrid;
    GridReturSelectedData: any = {} as any;

    GridPotonganPembelianProps: GridModel.IGrid;
    GridPotonganPembalianSelectedData: any = {} as any;

    ShowDialogPayment = false;

    SelectedPaymentMethod = 'cash';

    GridPaymentMethodDatasource: any[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _titipTagihanService: TitipTagihanService,
        private _setupRekeningOwnerService: SetupRekeningOwnerService,
        private _pelunasanHutangSupplierService: PelunasanHutangSupplierService
    ) {
        this.DashboardProps = {
            title: 'Bayar Titip Tagihan',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'bayar', caption: 'Bayar', icon: 'pi pi-check text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_titip_tagihan_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_bayar_hutang',
                    label: 'Total Titip Tagihan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    hidden: true
                },
                {
                    id: 'kode_supplier',
                    label: 'Kode Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                    hidden: true
                },
                {
                    id: 'tanggal_titip_tagihan',
                    label: 'Tgl. TT',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tanggal_rencana_bayar',
                    label: 'Tgl. Bayar',
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
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.FormInputFooter = {
            id: 'form_titip_tagihan_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total_titip_tagihan',
                    label: 'Total Titip Tagihan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_retur',
                    label: 'Total Retur',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_potongan',
                    label: 'Total Potongan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
                {
                    id: 'total_bayar',
                    label: 'Total Bayar',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    is_form_grouped: false,
                },
            ],
            custom_class: 'grid-rows-4 grid-cols-1',
        };

        this.GridProps = {
            column: [
                { field: 'nomor_penerimaan', headerName: 'FAKTUR', flex: 200, sortable: true, resizable: true, },
                { field: 'no_nota', headerName: 'NO. NOTA', flex: 200, sortable: true, resizable: true },
                { field: 'tanggal_nota', headerName: 'TGL. NOTA', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'created_at', headerName: 'WAKTU INPUT', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'validasi_at', headerName: 'WAKTU VALIDASI', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'total_transaksi', headerName: 'SUBTOTAL', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
            ],
            dataSource: [],
            height: "250px",
            toolbar: [],
            showPaging: false,
        };

        this.GridReturProps = {
            column: [
                { field: 'nomor_retur_pembelian', headerName: 'FAKTUR', flex: 200, sortable: true, resizable: true, },
                { field: 'tanggal_retur_pembelian', headerName: 'TGL. RETUR', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
                { field: 'total_harga', headerName: 'TOTAL HARGA', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'qty', headerName: 'QTY', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'created_at', headerName: 'WAKTU INPUT', flex: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value, 'DD-MM-yyyy') : e } },
            ],
            dataSource: [],
            height: "250px",
            toolbar: [],
            showPaging: false,
        };

        this.GridPotonganPembelianProps = {
            column: [
                { field: 'id_potongan_pembelian', headerName: 'ID', flex: 200, sortable: true, resizable: true, hide: true },
                { field: 'potongan_pembelian', headerName: 'POTONGAN PEMBELIAN', flex: 200, sortable: true, resizable: true, },
                {
                    field: 'total_potongan', headerName: 'TOTAL POTONGAN', flex: 200, sortable: true, resizable: true,
                    editable: false,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e },
                    valueGetter: params => { return params.data.total_potongan },
                    valueSetter: params => {
                        const data = JSON.parse(JSON.stringify(params.data));
                        data.total_potongan = params.newValue;
                        params.data = data;
                        return true;
                    },
                    // onCellValueChanged: (e: any) => {
                    //     this.countFooter();
                    // }
                },
            ],
            dataSource: [],
            height: "250px",
            toolbar: [],
            showPaging: false,
        };

        this.FormInputDialog = {
            id: 'form_pelunasan_dialog',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_bayar_hutang',
                    label: 'Total Titip Tagihan',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                    hidden: true
                },
                {
                    id: 'tanggal_bayar',
                    label: 'Tanggal Bayar',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'kode_supplier',
                    label: 'Kode Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama_supplier',
                    label: 'Nama Supplier',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'insert',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-2',
        };

        this.FormInputPaymentDialog = {
            id: 'form_payment_dialog',
            type: 'save',
            is_inline: true,
            fields: [
                // ** 0
                {
                    id: 'id_rekening',
                    label: 'Rekening',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                    hidden: true,
                },
                // ** 1
                {
                    id: 'waktu_bayar',
                    label: 'Waktu Bayar',
                    status: 'insert',
                    type: 'datetime',
                    required: true,
                    hidden: true,
                },
                // ** 2
                {
                    id: 'pemberi_uang',
                    label: 'Nama Pemberi',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                // ** 3
                {
                    id: 'penerima_uang',
                    label: 'Nama Penerima',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                // ** 4
                {
                    id: 'no_giro',
                    label: 'No. Giro',
                    status: 'insert',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                // ** 5
                {
                    id: 'tanggal_jatuh_tempo',
                    label: 'Tgl. Jatuh Tempo',
                    status: 'insert',
                    type: 'date',
                    required: true,
                    hidden: true,
                },
                // ** 6
                {
                    id: 'nominal_bayar',
                    label: 'Nominal Bayar',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                    hidden: true,
                    numeric_keyup_enter: (args: any) => {
                        this.handleAddPaymentMethod(this.SelectedPaymentMethod, this.CustomFormPaymentDialog.CustomForms.value);
                    }
                },
                // ** 7
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'insert',
                    type: 'string',
                    required: false,
                    hidden: true,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-1',
        };
    }

    ngOnInit(): void {
        this.getTitipTagihanById();
    }

    private getTitipTagihanById(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._titipTagihanService
            .getById(id)
            .pipe(
                map((result) => {
                    if (result.success) {
                        return result.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.CustomForm.props.default_value = result;
                this.CustomForm.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.faktur;
                this.GridReturProps.dataSource = result.retur;
                this.GridPotonganPembelianProps.dataSource = result.potongan;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['finance/pelunasan-hutang-supplier/input']);
                break;
            case 'bayar':
                this.handleOpenDialogPayment();
                break;
            default:
                break;
        }
    }

    handleOpenDialogPayment() {
        this.ShowDialogPayment = true;
        setTimeout(() => {
            this.getRekeningOwner();
            this.CustomFormDialog.CustomForms.patchValue({
                id_bayar_hutang: this.CustomForm.CustomForms.get('id_bayar_hutang')?.value,
                tanggal_bayar: this.CustomForm.CustomForms.get('tanggal_rencana_bayar')?.value,
                kode_supplier: this.CustomForm.CustomForms.get('kode_supplier')?.value,
                nama_supplier: this.CustomForm.CustomForms.get('nama_supplier')?.value,
            });
            this.CustomFormPaymentDialog.CustomForms.reset();
            this.handleChangePaymentMethod('cash');
        }, 1000);
    }

    private getRekeningOwner() {
        this._setupRekeningOwnerService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    this.FormInputPaymentDialog.fields[0].select_props = result.data.data.map((item: any) => {
                        return {
                            name: `${item.bank} - ${item.nama_rekening} - ${item.nomor_rekening}`,
                            value: item.id_rekening
                        }
                    })
                }
            })
    }

    handleChangePaymentMethod(payment_method: string) {
        if (payment_method == 'cash') {
            this.CustomFormPaymentDialog.handleSetFormClass('grid-rows-2 grid-cols-2');

            this.FormInputPaymentDialog.fields[0].hidden = true;
            this.FormInputPaymentDialog.fields[1].hidden = false;
            this.FormInputPaymentDialog.fields[2].hidden = false;
            this.FormInputPaymentDialog.fields[3].hidden = false;
            this.FormInputPaymentDialog.fields[4].hidden = true;
            this.FormInputPaymentDialog.fields[5].hidden = true;
            this.FormInputPaymentDialog.fields[6].hidden = false;
            this.FormInputPaymentDialog.fields[7].hidden = true;
        };

        if (payment_method == 'transfer') {
            this.CustomFormPaymentDialog.handleSetFormClass('grid-rows-2 grid-cols-2');

            this.FormInputPaymentDialog.fields[0].hidden = false;
            this.FormInputPaymentDialog.fields[1].hidden = false;
            this.FormInputPaymentDialog.fields[2].hidden = true;
            this.FormInputPaymentDialog.fields[3].hidden = true;
            this.FormInputPaymentDialog.fields[4].hidden = true;
            this.FormInputPaymentDialog.fields[5].hidden = true;
            this.FormInputPaymentDialog.fields[6].hidden = false;
            this.FormInputPaymentDialog.fields[7].hidden = true;
        };

        if (payment_method == 'giro') {
            this.CustomFormPaymentDialog.handleSetFormClass('grid-rows-2 grid-cols-2');

            this.FormInputPaymentDialog.fields[0].hidden = true;
            this.FormInputPaymentDialog.fields[1].hidden = false;
            this.FormInputPaymentDialog.fields[2].hidden = true;
            this.FormInputPaymentDialog.fields[3].hidden = true;
            this.FormInputPaymentDialog.fields[4].hidden = false;
            this.FormInputPaymentDialog.fields[5].hidden = false;
            this.FormInputPaymentDialog.fields[6].hidden = false;
            this.FormInputPaymentDialog.fields[7].hidden = true;
        };
    }

    handleAddPaymentMethod(payment_method: string, data: any) {
        const dataToSave = {
            metode_bayar: payment_method,
            ...data
        };

        this.GridPaymentMethodDatasource.push(dataToSave);
        this.CustomFormPaymentDialog.CustomForms.reset();
        this.handleChangePaymentMethod('cash');
    }

    handleDeletePaymentMethod(index: number) {
        this.GridPaymentMethodDatasource.splice(index, 1);
    }

    handleSavePaymentHutang() {
        const detail_transfer = this.GridPaymentMethodDatasource
            .filter(item => item.metode_bayar == 'transfer')
            .map((item: any) => {
                return {
                    id_rekening: item.id_rekening,
                    waktu_bayar: formatDate(item.waktu_bayar, 'yyyy-MM-dd HH:mm:ss', 'EN'),
                    nominal_bayar: item.nominal_bayar,
                }
            });

        const detail_cash = this.GridPaymentMethodDatasource
            .filter(item => item.metode_bayar == 'cash')
            .map((item: any) => {
                return {
                    penerima_uang: item.penerima_uang,
                    pemberi_uang: item.pemberi_uang,
                    keterangan: item.keterangan,
                    waktu_bayar: formatDate(item.waktu_bayar, 'yyyy-MM-dd HH:mm:ss', 'EN'),
                    nominal_bayar: item.nominal_bayar,
                }
            });

        const detail_giro = this.GridPaymentMethodDatasource
            .filter(item => item.metode_bayar == 'giro')
            .map((item: any) => {
                return {
                    no_giro: item.no_giro,
                    tanggal_jatuh_tempo: formatDate(item.tanggal_jatuh_tempo, 'yyyy-MM-dd', 'EN'),
                    nominal_bayar: item.nominal_bayar,
                }
            });

        const payload = {
            ...this.CustomFormDialog.CustomForms.value,
            detail_transfer: detail_transfer,
            detail_cash: detail_cash,
            detail_giro: detail_giro,
        };

        this._pelunasanHutangSupplierService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    setTimeout(() => {
                        this._router.navigate(['finance/pelunasan-hutang-supplier/history']);
                    }, 1500);
                }
            })
    }
}
