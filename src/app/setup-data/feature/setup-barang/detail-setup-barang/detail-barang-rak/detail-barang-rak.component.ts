import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { SetupBarangAction } from 'src/app/@shared/state/setup-data/setup-barang';
import { SetupRakAction } from 'src/app/@shared/state/setup-data/setup-rak';

@Component({
    selector: 'app-detail-barang-rak',
    templateUrl: './detail-barang-rak.component.html',
    styleUrls: ['./detail-barang-rak.component.scss']
})
export class DetailBarangRakComponent implements OnInit {

    @Input('id_barang') id_barang: number = 0;

    GridBarangRakProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: SetupBarangModel.ISetupBarangRak = {} as any;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.GridBarangRakProps = {
            column: [
                { field: 'kode_rak', headerName: 'KODE RAK', width: 400, sortable: true, resizable: true },
                { field: 'nama_rak', headerName: 'NAMA RAK', width: 400, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 250, sortable: true, resizable: true, cellClass: 'text-center' },

            ],
            dataSource: [],
            height: '345px',
            toolbar: ['Add', 'Delete'],
        };

        this.FormDialogProps = {
            title: 'Setup Barang Rak',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_rak',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang_rak',
                        label: 'Id Barang Rak',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'id_barang',
                        label: 'Id Barang',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'id_rak',
                        label: 'Rak',
                        status: 'insert',
                        type: 'select',
                        required: true,
                        validator: 'Rak Tidak Boleh Kosong',
                        select_props: [],
                    },
                ],
                custom_class: 'grid-rows-1'
            }
        }
    }

    ngOnInit(): void {
        this.getDetailBarangRak();
        this.getDataRak();
    }

    getDetailBarangRak(): void {
        this._store.dispatch(new SetupBarangAction.GetAllBarangRak(this.id_barang))
            .pipe(
                map((result) => {
                    if (result.setup_barang.entities.success) {
                        return result.setup_barang.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.GridBarangRakProps.dataSource = result;
            })

    }

    getDataRak(): void {
        this._store.dispatch(new SetupRakAction.GetAll())
            .pipe(
                map((result) => {
                    if (result.setup_rak.entities.success) {
                        return result.setup_rak.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                const indexRak = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'id_rak' });

                this.FormDialogProps.form_props.fields[indexRak].select_props = result.map((item: any) => {
                    return { name: item.nama_rak, value: item.id_rak }
                });
            })
    }

    handleRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_barang_rak: args.id_barang_rak,
            id_barang: args.id_barang,
            id_rak: args.id_rak,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleToolbarClicked(args: GridModel.IGridToolbar): void {
        switch (args.id) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                this._store.dispatch(new SetupBarangAction.DeleteBarangRak(this.SelectedData.id_barang_rak))
                    .subscribe((result) => {
                        if (result.setup_barang.entities.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            this.getDetailBarangRak();
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(args: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupBarangModel.SaveSetupBarangRak = {
                id_barang: this.id_barang,
                id_rak: args.id_rak,
            };

            this._store.dispatch(new SetupBarangAction.SaveBarangRak(payload))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getDetailBarangRak();
                    }
                })
        } else {
            const payload: SetupBarangModel.UpdateSetupBarangRak = {
                id_barang_rak: args.id_barang_rak,
                id_barang: this.id_barang,
                id_rak: args.id_rak,
            };

            this._store.dispatch(new SetupBarangAction.UpdateBarangRak(payload))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getDetailBarangRak();
                    }
                })
        }
    }
}
