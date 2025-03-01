import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { AssemblyService } from 'src/app/@core/service/inventory/assembly/assembly.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-produksi-assembly',
    templateUrl: './input-produksi-assembly.component.html',
    styleUrls: ['./input-produksi-assembly.component.scss']
})
export class InputProduksiAssemblyComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

    GridProps: GridModel.IGrid;
    GridSelectedData: any = {} as any;

    Keterangan: string = "";

    TotalHppAverageKomponen: number = 0;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _assemblyService: AssemblyService,

    ) {
        this.DashboardProps = {
            title: 'Input Assembly',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputDetail = {
            title: 'Item',
            type: 'add',
            form_props: {
                id: 'form_assembly_detail',
                type: 'save',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang',
                        label: 'Id Barang',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupBarangKomponen',
                            title: 'Data Barang',
                            columns: [
                                { field: 'kode_barang', width: 250, headerName: 'KODE BARANG', sortable: true, resizable: true },
                                { field: 'nama_barang', width: 250, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                                { field: 'barcode', width: 250, headerName: 'BARCODE', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                                { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                                { id: 'barcode', title: 'Barcode', type: 'contain', value: 'mb.barcode' },

                            ],
                            label: 'Barang',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/produksi/lookup_barang`,
                            callback: (args: any) => {
                                const qty_komponen = args.qty_komponen ? parseFloat(args.qty_komponen) : 0,
                                    hpp_average = args.hpp_average ? parseFloat(args.hpp_average) : 0;

                                const qty_produksi = this.CustomForm.CustomForms.get('qty_produksi')?.value;

                                this.FormDialog.CustomForm.CustomForms.get('qty')?.setValue(qty_komponen * qty_produksi);
                                this.FormDialog.CustomForm.CustomForms.get('hpp_average')?.setValue(hpp_average);
                                this.FormDialog.CustomForm.CustomForms.get('sub_total')?.setValue((qty_komponen * qty_produksi) * hpp_average);
                            }
                        },
                        lookup_set_value_field: ['kode_barang', 'barcode', 'nama_barang', 'kode_satuan'],
                        required: true,
                    },
                    {
                        id: 'kode_barang',
                        label: 'Kode Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'barcode',
                        label: 'Barcode',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'nama_barang',
                        label: 'Nama Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
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
                        numeric_mode: 'decimal',
                        required: true,
                        numeric_callback: (args: any) => {
                            const hpp_average = this.FormDialog.CustomForm.CustomForms.get('hpp_average')?.value;
                            this.FormDialog.CustomForm.CustomForms.get('sub_total')?.setValue((args) * hpp_average);
                        }
                    },
                    {
                        id: 'hpp_average',
                        label: 'HPP Average',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        numeric_callback: (args: any) => {
                            const qty = this.FormDialog.CustomForm.CustomForms.get('qty')?.value;
                            this.FormDialog.CustomForm.CustomForms.get('sub_total')?.setValue(args * qty);
                        }
                    },
                    {
                        id: 'sub_total',
                        label: 'Subtotal',
                        status: 'readonly',
                        type: 'numeric',
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-5 grid-cols-1'
            },
            width: '45vw'
        };

        this.FormInputHeader = {
            id: 'form_assembly_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_produksi',
                    label: 'Tgl. Assembly',
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
                        label: 'Assembly Ke',
                        selectedField: 'nama_barang',
                        selectedValue: 'id_barang',
                        url: `${environment.endpoint}/barang/by_param`,
                        callback: (args: any) => {
                            this.CustomForm.CustomForms.get('hpp_avarage_produksi')?.setValue(args.hpp_average ? parseFloat(args.hpp_average) : 0);
                            this.FormInputDetail.form_props.fields[0].lookup_props!.url = `${environment.endpoint}/produksi/lookup_barang/${args.id_barang}`;
                        }
                    },
                    required: true,
                },
                {
                    id: 'hpp_avarage_produksi',
                    label: 'Hpp Average',
                    status: 'insert',
                    type: 'numeric',
                    required: true,
                },
                {
                    id: 'qty_produksi',
                    label: 'Qty Assembly',
                    status: 'insert',
                    type: 'numeric',
                    numeric_mode: 'decimal',
                    required: true,
                    numeric_callback: (args: any) => {
                        const hpp_avarage_produksi: number = this.CustomForm.CustomForms.get('hpp_avarage_produksi')?.value!;
                        const total_hpp_avarage_produksi = parseFloat(args) * parseFloat(hpp_avarage_produksi as any);
                        this.CustomForm.CustomForms.get('total_hpp_avarage_produksi')?.setValue(total_hpp_avarage_produksi);
                    }
                },
                {
                    id: 'total_hpp_avarage_produksi',
                    label: 'Total Hpp Avg',
                    status: 'readonly',
                    type: 'numeric',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        }

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id_barang', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 250, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 350, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 200, sortable: true, resizable: true },
                { field: 'kode_satuan', headerName: 'SATUAN', width: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'QTY', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'hpp_average', headerName: 'HPP AVERAGE', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
                { field: 'sub_total', headerName: 'SUBTOTAL', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value) : e } },
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
                this._router.navigate(['inventory/assembly/history']);
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

        this.TotalHppAverageKomponen = 0;

        this.GridProps.dataSource.forEach((item) => {
            item.sub_total = parseFloat(item.sub_total);
            this.TotalHppAverageKomponen += item.sub_total;
        });
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.GridProps.dataSource;
        header.keterangan = this.Keterangan;
        header.total_hpp_avarage_komponen = this.TotalHppAverageKomponen;

        this._assemblyService
            .save(header)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    this.CustomForm.handleResetForm();

                    setTimeout(() => {
                        this._router.navigate(['inventory/assembly/history']);
                    }, 1500);
                }
            });


    }
}
