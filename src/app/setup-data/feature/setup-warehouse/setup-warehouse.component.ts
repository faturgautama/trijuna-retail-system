import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';
import { SetupWarehouseAction } from 'src/app/@shared/state/setup-data/setup-warehouse';

@Component({
    selector: 'app-setup-warehouse',
    templateUrl: './setup-warehouse.component.html',
    styleUrls: ['./setup-warehouse.component.scss']
})
export class SetupWarehouseComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    LokasiDatasource: CustomFormModel.IFormSelectProps[] = [];

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Warehouse',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 650, sortable: true, resizable: true },
                { field: 'lokasi', headerName: 'LOKASI', width: 650, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)"
        };

        this.FormDialogProps = {
            title: 'Setup Warehouse',
            type: 'add',
            form_props: {
                id: 'form_setup_warehouse',
                is_inline: true,
                fields: [
                    {
                        id: 'id_warehouse',
                        label: 'Id Warehouse',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'warehouse',
                        label: 'Warehouse',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Warehouse Tidak Boleh Kosong',
                    },
                    {
                        id: 'lokasi',
                        label: 'Lokasi',
                        status: 'insert',
                        type: 'select',
                        select_props: this.LokasiDatasource,
                        required: true,
                        validator: 'Lokasi Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-2'
            },
        }
    }

    ngOnInit(): void {
        this.getAllWarehouse();

        this._store.dispatch(new SetupLokasiAction.GetAll())
            .subscribe((result) => {
                if (result.setup_lokasi.entities.success) {

                    this.LokasiDatasource = result.setup_lokasi.entities.data.map((item: any) => {
                        return {
                            name: item.nama_lokasi,
                            value: item.nama_lokasi
                        }
                    });

                    this.FormDialogProps.form_props.fields = [
                        {
                            id: 'id_warehouse',
                            label: 'Id Warehouse',
                            status: 'insert',
                            type: 'string',
                            hidden: true,
                            required: true,
                        },
                        {
                            id: 'warehouse',
                            label: 'Warehouse',
                            status: 'insert',
                            type: 'string',
                            required: true,
                            validator: 'Warehouse Tidak Boleh Kosong',
                        },
                        {
                            id: 'lokasi',
                            label: 'Lokasi',
                            status: 'insert',
                            type: 'select',
                            select_props: this.LokasiDatasource,
                            required: true,
                            validator: 'Lokasi Tidak Boleh Kosong',
                        },
                    ];
                }
            });
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            default:
                break;
        }
    }

    onRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_warehouse: args.id_warehouse,
            warehouse: args.warehouse,
            lokasi: args.lokasi,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllWarehouse(): void {
        this._store.dispatch(new SetupWarehouseAction.GetAll())
            .subscribe((result) => {
                if (result.setup_warehouse.entities.success) {
                    this.GridProps.dataSource = result.setup_warehouse.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupWarehouseModel.SaveSetupWarehouse = {
                warehouse: data.warehouse,
                lokasi: data.lokasi,
            };

            this._store.dispatch(new SetupWarehouseAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_warehouse.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllWarehouse();
                    }
                })
        } else {
            this._store.dispatch(new SetupWarehouseAction.Update(data))
                .subscribe((result) => {
                    if (result.setup_warehouse.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllWarehouse();
                    }
                })
        }
    }
}
