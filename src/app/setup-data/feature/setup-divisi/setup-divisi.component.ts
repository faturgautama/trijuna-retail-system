import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupDivisiModel } from 'src/app/@shared/models/setup-data/setup-divisi.model';
import { SetupDivisiAction } from 'src/app/@shared/state/setup-data/setup-divisi';

@Component({
    selector: 'app-setup-divisi',
    templateUrl: './setup-divisi.component.html',
    styleUrls: ['./setup-divisi.component.scss']
})
export class SetupDivisiComponent implements OnInit {

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
            title: 'Data Setup Divisi',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'kode_divisi', headerName: 'KODE DIVISI', flex: 300, sortable: true, resizable: true },
                { field: 'divisi', headerName: 'DIVISI', flex: 500, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Divisi',
            type: 'add',
            form_props: {
                id: 'form_setup_divisi',
                is_inline: true,
                fields: [
                    {
                        id: 'id_divisi',
                        label: 'Id Divisi',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        hidden: true,
                    },
                    {
                        id: 'kode_divisi',
                        label: 'Kode Divisi',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        hidden: false,
                    },
                    {
                        id: 'divisi',
                        label: 'Divisi',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Divisi Tidak Boleh Kosong',
                    }
                ],
                custom_class: 'grid-rows-1'
            },
        }
    }

    ngOnInit(): void {
        this.getAllDivisi();
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
            id_divisi: args.id_divisi,
            kode_divisi: args.kode_divisi,
            divisi: args.divisi,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllDivisi(): void {
        this._store.dispatch(new SetupDivisiAction.GetAll())
            .subscribe((result) => {
                if (result.setup_divisi.entities.success) {
                    this.GridProps.dataSource = result.setup_divisi.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupDivisiModel.SaveSetupDivisi = {
                divisi: data.divisi,
            };

            this._store.dispatch(new SetupDivisiAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_divisi.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllDivisi();
                    }
                })
        } else {
            const payload: SetupDivisiModel.UpdateSetupDivisi = {
                id_divisi: data.id_divisi,
                kode_divisi: data.kode_divisi,
                divisi: data.divisi,
            };

            this._store.dispatch(new SetupDivisiAction.Update(payload))
                .subscribe((result) => {
                    if (result.setup_divisi.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllDivisi();
                    }
                })
        }
    }
}
