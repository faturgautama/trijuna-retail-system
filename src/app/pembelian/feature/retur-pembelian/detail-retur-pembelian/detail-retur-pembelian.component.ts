import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { ReturPembelianService } from 'src/app/@core/service/pembelian/retur-pembelian/retur-pembelian.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { ReturPembelianModel } from 'src/app/@shared/models/pembelian/retur-pembelian.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { ReturPembelianAction } from 'src/app/@shared/state/pembelian/retur-pembelian';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';

@Component({
    selector: 'app-detail-retur-pembelian',
    templateUrl: './detail-retur-pembelian.component.html',
    styleUrls: ['./detail-retur-pembelian.component.scss']
})
export class DetailReturPembelianComponent implements OnInit, AfterViewInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    FormInputFooter: CustomFormModel.IForm = {} as any;
    @ViewChild('CustomFormFooter') CustomFormFooter!: CustomFormComponent;

    GridProps: GridModel.IGrid = {} as any;
    GridSelectedData: ReturPembelianModel.IReturPembelianDetail = {} as any;
    GridSelectedIndex: number = 0;
    GridDatasource: any[] = [];

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _activatedRoute: ActivatedRoute,
        private _utilityService: UtilityService,
        private _returPembelianService: ReturPembelianService,
    ) {
        this.DashboardProps = {
            title: 'Detail Retur Pembelian',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_retur_pembelian_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'id_retur_pembelian',
                    label: 'Id Retur Pembelian',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                    hidden: true,
                },
                {
                    id: 'jenis_retur',
                    label: 'Jenis Retur',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'tanggal_retur_pembelian',
                    label: 'Tgl. Retur',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'nomor_retur_pembelian',
                    label: 'No. Retur',
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
                    id: 'id_warehouse',
                    label: 'Warehouse',
                    status: 'readonly',
                    type: 'select',
                    select_props: [],
                    required: true,
                },
                {
                    id: 'mekanisme',
                    label: 'Mekanisme',
                    status: 'readonly',
                    type: 'select',
                    select_props: [],
                    required: true,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        };

        this.FormInputFooter = {
            id: 'form_retur_pembelian_footer',
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
                    id: 'total_harga',
                    label: 'Total Harga',
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
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'banyak', headerName: 'BANYAK', width: 150, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 150, sortable: true, resizable: true, },
                { field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true },
                { field: 'harga_satuan', headerName: 'HARGA SATUAN', width: 180, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e } },
            ],
            dataSource: [],
            height: "250px",
            showPaging: false,
            toolbar: [],
        };
    }

    ngOnInit(): void {
        this.onGetWarehouse();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getPenerimaanTanpaPoById();
        }, 100);
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

        this._store.dispatch(new ReturPembelianAction.GetById(id))
            .pipe(
                map((result: any) => {
                    if (result.retur_pembelian.entities.success) {
                        return result.retur_pembelian.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result: any) => {
                this.CustomForm.props.default_value = result;
                this.CustomForm.handleSetFormDefaultValue();

                this.GridProps.dataSource = result.detail;

                this.CustomFormFooter.props.default_value = result;
                this.CustomFormFooter.handleSetFormDefaultValue();

                if (result.status_retur == 'OPEN') {
                    this.DashboardProps.button_navigation.push(
                        { id: 'validasi', caption: 'Validasi', icon: 'pi pi-check text-xs' },
                        { id: 'cancel', caption: 'Cancel', icon: 'pi pi-times text-xs' },
                    )
                }
            })
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['pembelian/retur-pembelian/history']);
                break;
            case 'validasi':
                this.handleSubmitForm();
                break;
            case 'cancel':
                this.cancel();
                break;
            default:
                break;
        }
    }

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onCountFormFooter(): void {
        let qty = 0;
        let subtotal = 0;

        this.GridProps.dataSource.forEach((item) => {
            qty += parseFloat(item.qty);
            subtotal += parseFloat(item.sub_total);

            this.CustomFormFooter.handleSetFieldValue('qty', qty);
            this.CustomFormFooter.handleSetFieldValue('sub_total', subtotal);
        });
    }

    handleSubmitForm(): void {
        const id_retur_pembelian = this.CustomForm.handleGetFieldValue('id_retur_pembelian');

        this._store.dispatch(new ReturPembelianAction.Validasi(id_retur_pembelian))
            .subscribe((result: any) => {
                if (result.retur_pembelian.entities.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Divalidasi' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['pembelian/retur-pembelian/history']);
                    }, 1500);
                }
            });
    }

    private cancel(): void {
        const id_retur_pembelian = this.CustomForm.handleGetFieldValue('id_retur_pembelian');

        this._returPembelianService
            .cancel(id_retur_pembelian)
            .subscribe((result: any) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dibatalkan' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['pembelian/retur-pembelian/history']);
                    }, 1500);
                }
            });
    }
}
