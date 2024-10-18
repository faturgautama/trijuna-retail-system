import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupDepartemenService } from 'src/app/@core/service/human-resource/setup-departemen/setup-departemen.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-setup-departemen',
    templateUrl: './setup-departemen.component.html',
    styleUrls: ['./setup-departemen.component.scss']
})
export class SetupDepartemenComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupDepartemenService: SetupDepartemenService,
    ) {
        this.DashboardProps = {
            title: 'Data Departemen',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'kode_departemen', headerName: 'KODE', flex: 750, sortable: true, resizable: true },
                { field: 'nama_departemen', headerName: 'DEPARTEMEN', flex: 750, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Departemen',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_nama_departemen',
                        label: 'Id Divisi',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'kode_departemen',
                        label: 'Kode Departemen',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                        validator: 'Kode Departemen Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_departemen',
                        label: 'Departemen',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Departemen Tidak Boleh Kosong',
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
                this.FormDialogProps.form_props.fields[1].hidden = true;
                this.FormDialogProps.form_props.custom_class = 'grid-rows-1';
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            default:
                break;
        }
    }

    onRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_nama_departemen: args.id_nama_departemen,
            kode_departemen: args.kode_departemen,
            nama_departemen: args.nama_departemen,
        };

        this.FormDialogProps.form_props.fields[1].hidden = false;
        this.FormDialogProps.form_props.custom_class = 'grid-rows-2';
        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAllGroup(): void {
        this._setupDepartemenService
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
                nama_departemen: data.nama_departemen,
            };

            this._setupDepartemenService
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
            this._setupDepartemenService
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
