import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SettingPointMemberService } from 'src/app/@core/service/setup-data/setting-point-member/setting-point-member.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
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

    @ViewChild('FormInputComps') FormInputComps!: CustomFormComponent;
    FormInput: CustomFormModel.IForm;

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

        this.FormInput = {
            id: 'input_setup_barang',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'nominal',
                    label: 'Nominal',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'dapat_poin',
                    label: 'Dapat Poin',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'created_at',
                    label: 'Waktu Input',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3'
        };

        this.GridProps = {
            column: [
                { field: 'group', headerName: 'GROUP', flex: 300, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 16rem)",
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
                    if (result.data) {
                        this.DashboardProps = {
                            title: 'Data Setting Point Member',
                            button_navigation: [
                                { id: 'add', caption: 'Edit', icon: 'pi pi-plus text-xs' }
                            ],
                        };

                        result.data.nominal = this._utilityService.FormatNumber(result.data.nominal, 'Rp. ');
                        result.data.created_at = this._utilityService.FormatDate(result.data.created_at, 'DD-MM-yyyy HH:mm:ss');
                        this.FormInputComps.CustomForms.patchValue(result.data);
                        this.GridProps.dataSource = result.data.group;

                    } else {
                        this.DashboardProps = {
                            title: 'Data Setting Point Member',
                            button_navigation: [
                                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
                            ],
                        };
                    }
                }
            })
    }

    handleSubmitForm(data: any): void {
        const payload: any = {
            nominal: data.nominal,
            dapat_poin: data.dapat_poin,
            group: data.group.map((item: any) => {
                return {
                    id_group: item.value
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
