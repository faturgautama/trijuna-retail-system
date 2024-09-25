import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { TitipTagihanService } from 'src/app/@core/service/finance/titip-tagihan/titip-tagihan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-detail-titip-tagihan',
    templateUrl: './detail-titip-tagihan.component.html',
    styleUrls: ['./detail-titip-tagihan.component.scss']
})
export class DetailTitipTagihanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

    GridReturProps: GridModel.IGrid;
    GridReturSelectedData: any = {} as any;

    GridPotonganPembelianProps: GridModel.IGrid;
    GridPotonganPembalianSelectedData: any = {} as any;

    Banyak: number = 0;
    Qty: number = 0;
    HargaSatuan: number = 0;
    TotalMutasi: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _titipTagihanService: TitipTagihanService,
    ) {
        this.DashboardProps = {
            title: 'Detail Titip Tagihan',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_titip_tagihan_header',
            type: 'save',
            is_inline: true,
            fields: [
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
                this._router.navigate(['finance/titip-tagihan/history']);
                break;
            default:
                break;
        }
    }
}
