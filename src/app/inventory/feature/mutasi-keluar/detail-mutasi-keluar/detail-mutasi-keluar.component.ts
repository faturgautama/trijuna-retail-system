import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, map } from 'rxjs';
import { MutasiKeluarService } from 'src/app/@core/service/inventory/mutasi-keluar/mutasi-keluar.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detail-mutasi-keluar',
    templateUrl: './detail-mutasi-keluar.component.html',
    styleUrls: ['./detail-mutasi-keluar.component.scss']
})
export class DetailMutasiKeluarComponent implements OnInit, OnDestroy {

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
        private _confirmationService: ConfirmationService,
        private _mutasiKeluarService: MutasiKeluarService,
    ) {
        this.DashboardProps = {
            title: 'Detail Mutasi Keluar',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'unduh', caption: 'Download File', icon: 'pi pi-download text-xs' },
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
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 200, sortable: true, resizable: true },
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

        this._mutasiKeluarService
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
                        title: 'Detail Mutasi Keluar',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            { id: 'unduh', caption: 'Download File', icon: 'pi pi-download text-xs' },
                            { id: 'validasi', caption: 'Validasi Offline', icon: 'pi pi-check text-xs' },
                            { id: 'validasi_online', caption: 'Validasi Online', icon: 'pi pi-check text-xs' },
                            { id: 'cancel', caption: 'Cancel', icon: 'pi pi-ban text-xs' },
                        ],
                    };
                } else {
                    this.DashboardProps = {
                        title: 'Detail Mutasi Keluar',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            { id: 'unduh', caption: 'Download File', icon: 'pi pi-download text-xs' },
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
        const id = this._activatedRoute.snapshot.params.id;

        switch (args) {
            case 'back':
                this._router.navigate(['inventory/mutasi-keluar/history']);
                break;
            case 'unduh':
                window.open(`${environment.endpoint}/mutasi_lokasi_keluar/download/${id}`);
                break;
            case 'validasi':
                this._mutasiKeluarService
                    .validasi({ id_mutasi_lokasi: id })
                    .subscribe((result) => {
                        if (result.status) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Divalidasi' });

                            this.CustomFormHeader.handleResetForm();
                            this.CustomFormFooter.handleResetForm();

                            setTimeout(() => {
                                this._router.navigate(['inventory/mutasi-keluar/history']);
                            }, 1500);
                        }
                    });
                break;
            case 'validasi_online':
                this._mutasiKeluarService
                    .validasiOnline({ id_mutasi_lokasi: id })
                    .subscribe((result) => {
                        if (result.status) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Divalidasi' });

                            this.CustomFormHeader.handleResetForm();
                            this.CustomFormFooter.handleResetForm();

                            setTimeout(() => {
                                this._router.navigate(['inventory/mutasi-keluar/history']);
                            }, 1500);
                        }
                    });
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
                        this._mutasiKeluarService
                            .cancel(this._activatedRoute.snapshot.params.id)
                            .subscribe((result) => {
                                if (result.status) {
                                    this._messageService.clear();
                                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dibatalkan' });

                                    setTimeout(() => {
                                        this._router.navigate(['inventory/mutasi-keluar/history']);
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

}
