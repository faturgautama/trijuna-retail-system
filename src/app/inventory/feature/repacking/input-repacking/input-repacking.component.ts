import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-repacking',
    templateUrl: './input-repacking.component.html',
    styleUrls: ['./input-repacking.component.scss']
})
export class InputRepackingComponent {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _messageService: MessageService,

    ) {
        this.DashboardProps = {
            title: 'Input Repacking',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_repacking_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_assembly',
                    label: 'Tgl. Repacking',
                    status: 'insert',
                    type: 'date',
                    required: true,
                },
                {
                    id: 'id_warehouse',
                    label: 'Warehouse',
                    status: 'insert',
                    type: 'select',
                    select_props: [],
                    required: true,
                },
                {
                    id: 'id_barang',
                    label: 'Id Barang',
                    status: 'insert',
                    type: 'lookup',
                    lookup_props: {
                        id: 'lookupBarang',
                        title: 'Data Barang',
                        columns: [
                            { field: 'kode_barang', width: 250, headerName: 'KODE BARANG', sortable: true, resizable: true },
                            { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                            { field: 'barcode', width: 250, headerName: 'BARCODE', sortable: true, resizable: true },
                        ],
                        filter: [
                            { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                            { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                        ],
                        label: 'Repacking Dari',
                        selectedField: 'nama_barang',
                        selectedValue: 'id_barang',
                        url: `${environment.endpoint}/barang/by_param`,
                    },
                    lookup_set_value_field: ['kode_barang', 'barcode', 'nama_barang'],
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
                    id: 'qty',
                    label: 'Qty',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        }

        this.FormInputDetail = {
            title: 'Item',
            type: 'add',
            form_props: {
                id: 'form_repacking_detail',
                type: 'save',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang_detail',
                        label: 'Id Barang',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupBarang',
                            title: 'Data Barang',
                            columns: [
                                { field: 'kode_barang', width: 250, headerName: 'KODE BARANG', sortable: true, resizable: true },
                                { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                                { field: 'barcode', width: 250, headerName: 'BARCODE', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                                { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                            ],
                            label: 'Barang',
                            selectedField: 'kode_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang/by_param`,
                        },
                        lookup_set_value_field: ['barcode', 'nama_barang', 'kode_satuan'],
                        required: true,
                    },
                    {
                        id: 'nama_barang',
                        label: 'Nama Barang',
                        status: 'insert',
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
                        id: 'kode_satuan',
                        label: 'Satuan',
                        status: 'readonly',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'qty',
                        label: 'Qty',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-5 grid-cols-1'
            },
            width: '45vw'
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 250, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 200, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
            ],
            dataSource: [],
            height: "250px",
            toolbar: ['Add', 'Delete'],
            showPaging: false,
        };
    }

    ngOnInit(): void {
        this.onGetWarehouse();
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['inventory/repacking/history']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
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

    onCellClicked(args: any): void {
        this.GridSelectedData = args;
    }

    onToolbarClicked(args: any): void {
        switch (args.id) {
            case 'add':
                this.FormInputDetail.type = 'add';
                this.FormDialog.onOpenFormDialog();
                this
                break;
            case 'delete':
                const selectedIndex = this.GridProps.dataSource.findIndex((item) => { return item.urut == this.GridSelectedData.urut });
                this.GridProps.dataSource.splice(selectedIndex, 1);
                break;
            default:
                break;
        }
    }

    handleSubmitFormDetail(data: any): void {
        data.urut = this.GridProps.dataSource.length + 1;
        this.GridProps.dataSource = [...this.GridProps.dataSource, data];
        this.FormDialog.onCloseFormDialog();
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;

        // this._store.dispatch(new PemesananPoAction.Save(payload))
        //     .subscribe((result) => {
        //         if (result.pemesanan_po.entities.success) {
        //             this._messageService.clear();
        //             this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

        //             this.CustomForm.handleResetForm();

        //             setTimeout(() => {
        //                 this._router.navigate(['pembelian/pemesanan-po/history']);
        //             }, 1500);
        //         }
        //     });

        this._messageService.clear();
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

        this.CustomForm.handleResetForm();

        setTimeout(() => {
            this._router.navigate(['inventory/repacking/history']);
        }, 1500);
    }
}
