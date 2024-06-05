import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupSatuanModel } from 'src/app/@shared/models/setup-data/setup-satuan.model';
import { SetupSatuanAction } from 'src/app/@shared/state/setup-data/setup-satuan';

@Component({
    selector: 'app-setup-satuan',
    templateUrl: './setup-satuan.component.html',
    styleUrls: ['./setup-satuan.component.scss']
})
export class SetupSatuanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Satuan',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'nama_satuan', headerName: 'SATUAN', flex: 1250, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Satuan',
            type: 'add',
            form_props: {
                id: 'form_setup_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'id_satuan',
                        label: 'Id Satuan',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'kode_satuan',
                        label: 'Kode Satuan',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Kode Satuan Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_satuan',
                        label: 'Satuan',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Satuan Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-2'
            },
        }
    }

    ngOnInit(): void {
        this.getAllSatuan();
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
            id_satuan: args.id_satuan,
            kode_satuan: args.kode_satuan,
            nama_satuan: args.nama_satuan,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllSatuan(): void {
        this._store.dispatch(new SetupSatuanAction.GetAll())
            .subscribe((result) => {
                if (result.setup_satuan.entities.success) {
                    this.GridProps.dataSource = result.setup_satuan.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupSatuanModel.SaveSetupSatuan = {
                kode_satuan: data.kode_satuan,
                nama_satuan: data.nama_satuan,
            };

            this._store.dispatch(new SetupSatuanAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_satuan.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllSatuan();
                    }
                })
        } else {
            this._store.dispatch(new SetupSatuanAction.Update(data))
                .subscribe((result) => {
                    if (result.setup_satuan.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllSatuan();
                    }
                })
        }
    }
}
