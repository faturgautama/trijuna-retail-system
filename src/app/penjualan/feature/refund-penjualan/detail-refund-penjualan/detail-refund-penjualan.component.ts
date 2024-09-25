import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject, map } from 'rxjs';
import { PenjualanService } from 'src/app/@core/service/penjualan/penjualan/penjualan.service';
import { RefundPenjualanService } from 'src/app/@core/service/penjualan/refund-penjualan/refund-penjualan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-detail-refund-penjualan',
    templateUrl: './detail-refund-penjualan.component.html',
    styleUrls: ['./detail-refund-penjualan.component.scss']
})
export class DetailRefundPenjualanComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomFormHeader') CustomFormHeader!: CustomFormComponent

    GridProps: GridModel.IGrid;

    @ViewChild('Keterangan') Keterangan!: ElementRef;

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _refundPenjualanService: RefundPenjualanService,
    ) {
        this.DashboardProps = {
            title: 'Detail Refund Penjualan',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_penjualan_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_refund',
                    label: 'Tgl. Refund',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'no_retur_penjualan',
                    label: 'No. Faktur',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'nama_kasir',
                    label: 'Nama Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 350, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', flex: 150, sortable: true, resizable: true },
                { field: 'qty_jual', headerName: 'QTY JUAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_jual', headerName: 'HARGA JUAL', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', flex: 200, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
            ],
            dataSource: [],
            height: "calc(100vh - 20rem)",
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_penjualan_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'total_refund',
                    label: 'Total Refund',
                    status: 'readonly',
                    type: 'numeric',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-1',
        };
    }

    ngOnInit(): void {
        this.getDetailPenjualan();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    getDetailPenjualan(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._refundPenjualanService
            .getById(id)
            .pipe(
                map((result) => {
                    return result.success ? result.data : result;
                })
            )
            .subscribe((result) => {
                if (result.status_penjualan == 'OPEN') {
                    this.DashboardProps = {
                        title: 'Detail Refund Penjualan',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            // { id: 'validasi', caption: 'Validasi', icon: 'pi pi-check text-xs' },
                        ],
                    };
                } else {
                    this.DashboardProps = {
                        title: 'Detail Refund Penjualan',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                        ],
                    };
                }

                result.is_using_voucher = result.is_using_voucher ? 'IYA' : 'TIDAK';

                this.CustomFormHeader.props.default_value = result;
                this.CustomFormHeader.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.detail;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['penjualan/refund-penjualan/history']);
                break;
            default:
                break;
        }
    }

}
