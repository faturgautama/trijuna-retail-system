import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupMerkModel } from 'src/app/@shared/models/setup-data/setup-merk.model';
import { SetupMerkAction } from 'src/app/@shared/state/setup-data/setup-merk';

@Component({
    selector: 'app-setup-merk',
    templateUrl: './setup-merk.component.html',
    styleUrls: ['./setup-merk.component.scss']
})
export class SetupMerkComponent implements OnInit {

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
            title: 'Data Setup Merk',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'merk', headerName: 'MERK', width: 1250, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Merk',
            type: 'add',
            form_props: {
                id: 'form_setup_merk',
                is_inline: true,
                fields: [
                    {
                        id: 'id_merk',
                        label: 'Id Merk',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: false,
                    },
                    {
                        id: 'merk',
                        label: 'Merk',
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
        this.getAllMerk();
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
            id_merk: args.id_merk,
            merk: args.merk,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllMerk(): void {
        this._store.dispatch(new SetupMerkAction.GetAll())
            .subscribe((result) => {
                if (result.setup_merk.entities.success) {
                    this.GridProps.dataSource = result.setup_merk.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupMerkModel.SaveSetupMerk = {
                merk: data.merk,
            };

            this._store.dispatch(new SetupMerkAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_merk.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllMerk();
                    }
                })
        } else {
            const payload: SetupMerkModel.UpdateSetupMerk = {
                id_merk: data.id_merk,
                merk: data.merk,
            };

            this._store.dispatch(new SetupMerkAction.Update(payload))
                .subscribe((result) => {
                    if (result.setup_merk.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllMerk();
                    }
                })
        }
    }
}
