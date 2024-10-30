import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SettingPointMemberService } from 'src/app/@core/service/setup-data/setting-point-member/setting-point-member.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';

@Component({
    selector: 'app-setting-point-member',
    templateUrl: './setting-point-member.component.html',
    styleUrls: ['./setting-point-member.component.scss']
})
export class SettingPointMemberComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _settingPointMemberService: SettingPointMemberService
    ) {
        this.DashboardProps = {
            title: 'Data Setting Point Member',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'nominal', headerName: 'NOMINAL', flex: 300, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value, 'Rp. ') } },
                { field: 'dapat_poin', headerName: 'DAPAT POINT', flex: 300, sortable: true, resizable: true, cellClass: 'text-end', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value, 'Rp. ') } },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setting Point Member',
            type: 'add',
            form_props: {
                id: 'form_setting_point_member',
                is_inline: true,
                fields: [
                    {
                        id: 'id_member_poin_setting',
                        label: 'Id ',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        hidden: true,
                    },
                    {
                        id: 'nominal',
                        label: 'Nominal',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        hidden: false,
                    },
                    {
                        id: 'dapat_poin',
                        label: 'Dapat Point',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        hidden: false,
                    },
                    {
                        id: 'group',
                        label: 'Group',
                        status: 'insert',
                        type: 'multi_select',
                        select_props: [],
                        required: true,
                        hidden: false,
                    },
                ],
                custom_class: 'grid-rows-3'
            },
        }
    }

    ngOnInit(): void {
        this.getAll();

        // ** Group
        const indexGroup = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'group' });

        this._store
            .dispatch(new SetupGroupAction.GetAll())
            .subscribe((result) => {
                if (result.setup_group.entities.success) {
                    this.FormDialogProps.form_props.fields[indexGroup].select_props = result.setup_group.entities.data.map((item: any) => {
                        return { name: item.group, value: item.id_group }
                    });
                }
            })
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
            id_member_poin_setting: args.id_member_poin_setting,
            dapat_poin: args.dapat_poin,
            group: args.group,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAll(): void {
        this._settingPointMemberService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        const payload: any = {
            nominal: data.nominal,
            dapat_poin: data.dapat_poin,
            group: data.group.map((item: any) => {
                return {
                    id_group: item
                }
            }),
        };

        this._settingPointMemberService
            .save(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();
                    this.getAll();
                }
            })
    }

}
