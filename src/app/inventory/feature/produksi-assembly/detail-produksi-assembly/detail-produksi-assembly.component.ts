import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { Subject, map } from 'rxjs';
import { AssemblyService } from 'src/app/@core/service/inventory/assembly/assembly.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-detail-produksi-assembly',
    templateUrl: './detail-produksi-assembly.component.html',
    styleUrls: ['./detail-produksi-assembly.component.scss']
})
export class DetailProduksiAssemblyComponent implements OnInit, OnDestroy {

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
        private _produksiService: AssemblyService,
    ) {
        this.DashboardProps = {
            title: 'Detail Assembly',
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
                    id: 'tanggal_produksi',
                    label: 'Tgl. Assembly',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nomor_produksi',
                    label: 'No. Faktur',
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
                    id: 'kode_barang',
                    label: 'Kode Barang',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'barcode',
                    label: 'Barcode',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nama_barang',
                    label: 'Nama Barang',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'qty_produksi',
                    label: 'Qty Assembly',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'hpp_avarage_produksi',
                    label: 'Hpp Average',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'total_hpp_avarage_produksi',
                    label: 'Total Hpp Avg',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-3 grid-cols-3',
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', flex: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', flex: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', flex: 350, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', flex: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'QTY', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'hpp_average', headerName: 'HPP AVERAE', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', flex: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
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
                    id: 'status_produksi',
                    label: 'Status Assembly',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'total_hpp_avarage_komponen',
                    label: 'Total Hpp Avg Komponen',
                    status: 'readonly',
                    type: 'string',
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

        this._produksiService
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
                if (result.status_produksi == 'OPEN') {
                    this.DashboardProps = {
                        title: 'Detail Assembly',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                            { id: 'validasi', caption: 'Validasi', icon: 'pi pi-check text-xs' },
                        ],
                    };
                } else {
                    this.DashboardProps = {
                        title: 'Detail Assembly',
                        button_navigation: [
                            { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                        ],
                    };
                }

                result.total_hpp_avarage_produksi = this._utilityService.FormatNumber(result.total_hpp_avarage_produksi, 'Rp. ');
                result.total_hpp_avarage_komponen = this._utilityService.FormatNumber(result.total_hpp_avarage_komponen, 'Rp. ');
                result.hpp_avarage_produksi = this._utilityService.FormatNumber(result.hpp_avarage_produksi, 'Rp. ');

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
                this._router.navigate(['inventory/assembly/history']);
                break;
            case 'validasi':
                const id = this._activatedRoute.snapshot.params.id;

                this._produksiService
                    .validasi(id)
                    .subscribe((result) => {
                        if (result.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Divalidasi' });

                            this.CustomFormHeader.handleResetForm();
                            this.CustomFormFooter.handleResetForm();

                            setTimeout(() => {
                                this._router.navigate(['inventory/assembly/history']);
                            }, 1500);
                        }
                    });
                break;
            default:
                break;
        }
    }

}
