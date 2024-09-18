import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupPotonganPembelianService } from 'src/app/@core/service/finance/setup-data/setup-potongan-pembelian.service';
import { SetupRekeningOwnerService } from 'src/app/@core/service/finance/setup-data/setup-rekening-owner.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-setup-potongan-pembelian',
    templateUrl: './setup-potongan-pembelian.component.html',
    styleUrls: ['./setup-potongan-pembelian.component.scss']
})
export class SetupPotonganPembelianComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupPotonganPembelianService: SetupPotonganPembelianService,
    ) {
        this.DashboardProps = {
            title: 'Data Setup Potongan Pembelian',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'potongan_pembelian', headerName: 'POTONGAN PEMBELIAN', flex: 500, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', flex: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Potongan Pembelian',
            type: 'add',
            form_props: {
                id: 'form_setup_potongan_pembelian',
                is_inline: true,
                fields: [
                    {
                        id: 'id_potongan_pembelian',
                        label: 'Id Potongan Pembelian',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'potongan_pembelian',
                        label: 'Potongan Pembelian',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Potongan Pembelian Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-1'
            },
        }
    }

    ngOnInit(): void {
        this.getAllPotonganPembelian();
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
            id_potongan_pembelian: args.id_potongan_pembelian,
            potongan_pembelian: args.potongan_pembelian,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAllPotonganPembelian(): void {
        this._setupPotonganPembelianService
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
                potongan_pembelian: data.potongan_pembelian
            };

            this._setupPotonganPembelianService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAllPotonganPembelian();
                    }
                })
        } else {
            this._setupPotonganPembelianService
                .update(data)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });
                        this.FormDialog.onCloseFormDialog();
                        this.getAllPotonganPembelian();
                    }
                })
        }
    }


}
