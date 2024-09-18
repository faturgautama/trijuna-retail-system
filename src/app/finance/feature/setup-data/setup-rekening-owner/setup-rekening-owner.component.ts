import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupRekeningOwnerService } from 'src/app/@core/service/finance/setup-data/setup-rekening-owner.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-setup-rekening-owner',
    templateUrl: './setup-rekening-owner.component.html',
    styleUrls: ['./setup-rekening-owner.component.scss']
})
export class SetupRekeningOwnerComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupRekeningOwnerService: SetupRekeningOwnerService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Rekening Owner',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'bank', headerName: 'NAMA BANK', flex: 150, sortable: true, resizable: true },
                { field: 'nama_rekening', headerName: 'NAMA PEMILIK REKENING', flex: 250, sortable: true, resizable: true },
                { field: 'nomor_rekening', headerName: 'NOMOR REKENING', flex: 250, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Rekening Owner',
            type: 'add',
            form_props: {
                id: 'form_setup_rekening_owner',
                is_inline: true,
                fields: [
                    {
                        id: 'id_rekening',
                        label: 'Id Satuan',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'bank',
                        label: 'Nama Bank',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Nama Bank Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_rekening',
                        label: 'Nama Pemilik Rekening',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Nama Pemilik Rekening Tidak Boleh Kosong',
                    },
                    {
                        id: 'nomor_rekening',
                        label: 'Nomor Rekening',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Nomor Rekening Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-3'
            },
        }
    }

    ngOnInit(): void {
        this.getAllRekening();
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
            id_rekening: args.id_rekening,
            bank: args.bank,
            nama_rekening: args.nama_rekening,
            nomor_rekening: args.nomor_rekening,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAllRekening(): void {
        this._setupRekeningOwnerService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: any = {
                bank: data.bank,
                nama_rekening: data.nama_rekening,
                nomor_rekening: data.nomor_rekening,
            };

            this._setupRekeningOwnerService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAllRekening();
                    }
                })
        } else {
            this._setupRekeningOwnerService
                .update(data)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAllRekening();
                    }
                })
        }
    }

}
