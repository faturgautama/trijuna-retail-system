import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupUserGroupService } from 'src/app/@core/service/setup-data/management-user/setup-user-group.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-setup-group-user',
    templateUrl: './setup-group-user.component.html',
    styleUrls: ['./setup-group-user.component.scss']
})
export class SetupGroupUserComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupUserGroupService: SetupUserGroupService,
    ) {
        this.DashboardProps = {
            title: 'Data User Group',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'group_name', headerName: 'GROUP', flex: 1250, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup User Group',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
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
                        id: 'group_name',
                        label: 'User Group',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'User Group Tidak Boleh Kosong',
                    },
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
            group_name: args.group_name,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllGroup(): void {
        this._setupUserGroupService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: any = {
                group_name: data.group_name,
            };

            this._setupUserGroupService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllGroup();
                    }
                })
        } else {
            this._setupUserGroupService
                .update(data)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllGroup();
                    }
                })
        }
    }

}
