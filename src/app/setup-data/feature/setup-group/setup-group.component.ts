import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupGroupModel } from 'src/app/@shared/models/setup-data/setup-group.model';
import { SetupMerkModel } from 'src/app/@shared/models/setup-data/setup-merk.model';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';
import { SetupMerkAction } from 'src/app/@shared/state/setup-data/setup-merk';

@Component({
    selector: 'app-setup-group',
    templateUrl: './setup-group.component.html',
    styleUrls: ['./setup-group.component.scss']
})
export class SetupGroupComponent implements OnInit {

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
            title: 'Data Setup Group',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'group', headerName: 'GROUP', flex: 1250, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Group',
            type: 'add',
            form_props: {
                id: 'form_setup_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_group',
                        label: 'Id Group',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'kode_group',
                        label: 'Kode Group',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Kode Group Tidak Boleh Kosong',
                    },
                    {
                        id: 'group',
                        label: 'Group',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Group Tidak Boleh Kosong',
                    }
                ],
                custom_class: 'grid-rows-1'
            },
        }
    }

    ngOnInit(): void {
        this.getAllGroup();
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
            id_group: args.id_group,
            kode_group: args.kode_group,
            group: args.group,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllGroup(): void {
        this._store.dispatch(new SetupGroupAction.GetAll())
            .subscribe((result) => {
                if (result.setup_group.entities.success) {
                    this.GridProps.dataSource = result.setup_group.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: any = {
                kode_group: data.kode_group,
                group: data.group,
            };

            this._store.dispatch(new SetupGroupAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_group.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllGroup();
                    }
                })
        } else {
            this._store.dispatch(new SetupGroupAction.Update(data))
                .subscribe((result) => {
                    if (result.setup_group.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllGroup();
                    }
                })
        }
    }
}
