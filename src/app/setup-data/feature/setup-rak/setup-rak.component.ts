import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupRakModel } from 'src/app/@shared/models/setup-data/setup-rak.model';
import { SetupRakAction } from 'src/app/@shared/state/setup-data/setup-rak';

@Component({
    selector: 'app-setup-rak',
    templateUrl: './setup-rak.component.html',
    styleUrls: ['./setup-rak.component.scss']
})
export class SetupRakComponent implements OnInit {

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
            title: 'Data Setup Rak',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'kode_rak', headerName: 'KODE RAK', width: 650, sortable: true, resizable: true },
                { field: 'nama_rak', headerName: 'RAK', width: 650, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)"
        };

        this.FormDialogProps = {
            title: 'Setup Rak',
            type: 'add',
            form_props: {
                id: 'form_setup_rak',
                is_inline: true,
                fields: [
                    {
                        id: 'id_rak',
                        label: 'Id Rak',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true
                    },
                    {
                        id: 'kode_rak',
                        label: 'Kode Rak',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Kode Satuan Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_rak',
                        label: 'Rak',
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
        this.getAllRak();
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
            id_rak: args.id_rak,
            kode_rak: args.kode_rak,
            nama_rak: args.nama_rak,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllRak(): void {
        this._store.dispatch(new SetupRakAction.GetAll())
            .subscribe((result) => {
                if (result.setup_rak.entities.success) {
                    this.GridProps.dataSource = result.setup_rak.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupRakModel.SaveSetupRak = {
                nama_rak: data.nama_rak,
            };

            this._store.dispatch(new SetupRakAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_rak.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllRak();
                    }
                })
        } else {
            this._store.dispatch(new SetupRakAction.Update(data))
                .subscribe((result) => {
                    if (result.setup_rak.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllRak();
                    }
                })
        }
    }
}
