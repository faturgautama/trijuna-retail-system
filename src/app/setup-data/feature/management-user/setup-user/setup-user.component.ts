import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupUserGroupService } from 'src/app/@core/service/setup-data/management-user/setup-user-group.service';
import { SetupUserService } from 'src/app/@core/service/setup-data/management-user/setup-user.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-setup-user',
    templateUrl: './setup-user.component.html',
    styleUrls: ['./setup-user.component.scss']
})
export class SetupUserComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupUserService: SetupUserService,
        private _setupUserGroupService: SetupUserGroupService,
    ) {
        this.DashboardProps = {
            title: 'Data User',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'nama', headerName: 'NAMA', flex: 500, sortable: true, resizable: true },
                { field: 'email', headerName: 'EMAIL', flex: 500, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup User',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_user',
                        label: 'Id User',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'nama',
                        label: 'Nama User',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Nama User Tidak Boleh Kosong',
                    },
                    {
                        id: 'id_group',
                        label: 'Group User',
                        status: 'insert',
                        type: 'select',
                        required: true,
                        validator: 'Group User Tidak Boleh Kosong',
                        select_props: []
                    },
                    {
                        id: 'id_level',
                        label: 'Group User',
                        status: 'insert',
                        type: 'numeric',
                        hidden: true,
                        required: false,
                        value: 1,
                    },
                    {
                        id: 'email',
                        label: 'Email',
                        status: 'insert',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'password',
                        label: 'Password',
                        status: 'insert',
                        type: 'password',
                        required: true,
                    },
                    {
                        id: 'is_active',
                        label: 'Is Active',
                        status: 'insert',
                        type: 'radio',
                        radio_props: [
                            { id: 'is_active_true', name: 'Ya', value: true },
                            { id: 'is_active_false', name: 'Tidak', value: false },
                        ],
                        required: false,
                        hidden: true
                    },
                ],
                custom_class: 'grid-rows-4'
            },
        }
    }

    ngOnInit(): void {
        this.getAllGroup();
        this.getAllUser();
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'add':
                this.FormDialogProps.form_props.fields[5].hidden = false;
                this.FormDialogProps.form_props.fields[6].hidden = true;
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            default:
                break;
        }
    }

    onRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_user: args.id_user,
            nama: args.nama,
            id_group: args.id_group,
            id_level: 1,
            email: args.email,
            password: args.password,
            is_active: args.is_active,
        };

        this.FormDialogProps.form_props.fields[5].hidden = true;
        this.FormDialogProps.form_props.fields[6].hidden = false;
        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAllGroup(): void {
        this._setupUserGroupService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    const indexGroup = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'id_group' });

                    this.FormDialogProps.form_props.fields[indexGroup].select_props = result.data.map((item: any) => {
                        return { name: item.group_name, value: item.id_group }
                    });
                }
            })
    }

    getAllUser(): void {
        this._setupUserService
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
                nama: data.nama,
                id_group: data.id_group,
                id_level: 1,
                email: data.email,
                password: data.password,
            };

            this._setupUserService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAllUser();
                    }
                })
        } else {
            this._setupUserService
                .update(data)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAllUser();
                    }
                })
        }
    }


}
