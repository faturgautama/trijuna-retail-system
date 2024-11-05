import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject, map } from 'rxjs';
import { MutasiMasukService } from 'src/app/@core/service/inventory/mutasi-masuk/mutasi-masuk.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { MutasiLokasiAction } from 'src/app/@shared/state/inventory/mutasi-lokasi';

@Component({
    selector: 'app-detail-mutasi-masuk',
    templateUrl: './detail-mutasi-masuk.component.html',
    styleUrls: ['./detail-mutasi-masuk.component.scss']
})
export class DetailMutasiMasukComponent implements OnInit, OnDestroy {

    Destroy$ = new Subject();

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomFormHeader') CustomFormHeader!: CustomFormComponent

    GridProps: GridModel.IGrid;

    @ViewChild('Keterangan') Keterangan!: ElementRef;

    FormInputFooter: CustomFormModel.IForm;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent

    constructor(
        private _store: Store,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _mutasiMasukService: MutasiMasukService,
    ) {
        this.DashboardProps = {
            title: 'Detail Mutasi Masuk',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_mutasi_lokasi_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_mutasi_lokasi',
                    label: 'Tgl. Mutasi',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nomor_mutasi_lokasi',
                    label: 'No. Faktur',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'lokasi_asal',
                    label: 'Lokasi Asal',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_warehouse_asal',
                    label: 'Warehouse Asal',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'lokasi_tujuan',
                    label: 'Lokasi Tujuan',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_warehouse_tujuan',
                    label: 'Warehouse Tujuan',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 250, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 200, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'harga_satuan', headerName: 'HARGA ORDER', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
            ],
            dataSource: [],
            height: "300px",
            showPaging: false,
        };

        this.FormInputFooter = {
            id: 'form_mutasi_lokasi_footer',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'status_mutasi_lokasi',
                    label: 'Status Mutasi',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'qty',
                    label: 'Jumlah Item',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'total_harga',
                    label: 'Grand Total',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-3 grid-cols-1',
        };
    }

    ngOnInit(): void {
        this.getDetailMutasiWarehouse();
    }

    ngOnDestroy(): void {
        this.Destroy$.next(0);
        this.Destroy$.complete();
    }

    getDetailMutasiWarehouse(): void {
        const id = this._activatedRoute.snapshot.params.id;

        this._mutasiMasukService
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
                if (result.status_mutasi_lokasi == 'OPEN') {
                    this.DashboardProps = {
                        title: 'Detail Mutasi Masuk',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            { id: 'validasi', caption: 'Validasi', icon: 'pi pi-check text-xs' },
                        ],
                    };
                } else {
                    this.DashboardProps = {
                        title: 'Detail Mutasi Masuk',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                        ],
                    };
                }

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
                this._router.navigate(['inventory/mutasi-masuk/history']);
                break;
            case 'validasi':
                const id = this._activatedRoute.snapshot.params.id;

                this._mutasiMasukService
                    .validasi({ id_mutasi_lokasi: id })
                    .subscribe((result) => {
                        if (result.status) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Divalidasi' });

                            this.CustomFormHeader.handleResetForm();
                            this.CustomFormFooter.handleResetForm();

                            setTimeout(() => {
                                this._router.navigate(['inventory/mutasi-masuk/history']);
                            }, 1500);
                        }
                    });
                break;
            default:
                break;
        }
    }

}
