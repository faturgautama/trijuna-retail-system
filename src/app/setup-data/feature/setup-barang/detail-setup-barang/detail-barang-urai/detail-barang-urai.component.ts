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
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-detail-barang-urai',
    templateUrl: './detail-barang-urai.component.html',
    styleUrls: ['./detail-barang-urai.component.scss']
})
export class DetailBarangUraiComponent implements OnInit {

    @Input('id_barang') id_barang: number = 0;

    GridBarangUraiProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: SetupBarangModel.ISetupBarangUrai = {} as any;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.GridBarangUraiProps = {
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 250, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 250, sortable: true, resizable: true },
                { field: 'qty_urai', headerName: 'QTY URAI', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 250, sortable: true, resizable: true, cellClass: 'text-center' },

            ],
            dataSource: [],
            height: '345px',
            toolbar: ['Add', 'Delete'],
        };

        this.FormDialogProps = {
            title: 'Setup Barang Urai',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_urai',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang_urai',
                        label: 'Id Barang Urai',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'id_barang',
                        label: 'Id Barang',
                        status: 'insert',
                        type: 'lookup',
                        lookup_props: {
                            id: 'lookupBarang',
                            title: 'Data Barang',
                            columns: [
                                { field: 'kode_barang', width: 340, headerName: 'KODE BARANG', sortable: true, resizable: true },
                                { field: 'nama_barang', width: 340, headerName: 'NAMA BARANG', sortable: true, resizable: true },
                            ],
                            filter: [
                                { id: 'kode_barang', title: 'Kode Barang', type: 'contain', value: 'mb.kode_barang' },
                                { id: 'nama_barang', title: 'Nama Barang', type: 'contain', value: 'mb.nama_barang' },
                            ],
                            label: 'Barang Urai',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang/by_param`
                        },
                        required: true,
                    },
                    {
                        id: 'qty_urai',
                        label: 'Qty Urai',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        validator: 'Qty Urai Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-2'
            }
        }
    }

    ngOnInit(): void {
        this.getDetailBarangUrai();
    }

    getDetailBarangUrai(): void {
        this._store.dispatch(new SetupBarangAction.GetAllBarangUrai(this.id_barang))
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
                this.GridBarangUraiProps.dataSource = result;
            })

    }

    handleRowDoubleClicked(args: any): void {
        console.log(args);

        this.FormDialogProps.form_props.default_value = {
            id_barang_Urai: args.id_barang_Urai,
            id_barang: args.id_barang,
            qty_urai: args.qty_urai,
        };

        this.FormDialogProps.type = 'edit';

        this.handleChangeLookupBarangStatus();

        this.FormDialog.onOpenFormDialog();
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleToolbarClicked(args: GridModel.IGridToolbar): void {
        switch (args.id) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.handleChangeLookupBarangStatus();
                this.FormDialog.onOpenFormDialog();
                break;
            case 'delete':
                this._store.dispatch(new SetupBarangAction.DeleteBarangUrai(this.SelectedData.id_barang_urai))
                    .subscribe((result) => {
                        if (result.setup_barang.entities.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            this.getDetailBarangUrai();
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleChangeLookupBarangStatus(): void {
        const indexIdBarang = this.FormDialogProps.form_props.fields.findIndex((item) => {
            return item.id == 'id_barang'
        });

        if (this.FormDialogProps.type == 'add') {
            this.FormDialogProps.form_props.fields[indexIdBarang].type = 'lookup';
        } else {
            this.FormDialogProps.form_props.fields[indexIdBarang].type = 'string';
            this.FormDialogProps.form_props.fields[indexIdBarang].status = 'readonly';
            this.FormDialogProps.form_props.fields[indexIdBarang].label = 'Barang Urai';
        }
    }

    handleSubmitForm(args: any): void {
        console.log(args);

        // if (this.FormDialogProps.type == 'add') {
        //     const payload: SetupBarangModel.SaveSetupBarangUrai = {
        //         id_barang: this.id_barang,
        //         qty_urai: args.qty_urai,
        //     };

        //     this._store.dispatch(new SetupBarangAction.SaveBarangUrai(payload))
        //         .subscribe((result) => {
        //             if (result.setup_barang.entities.success) {
        //                 this._messageService.clear();
        //                 this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

        //                 this.FormDialog.onCloseFormDialog();

        //                 this.getDetailBarangUrai();
        //             }
        //         })
        // } else {
        //     const payload: SetupBarangModel.UpdateSetupBarangUrai = {
        //         id_barang_urai: args.id_barang_urai,
        //         id_barang: this.id_barang,
        //         qty_urai: args.qty_urai,
        //     };

        //     this._store.dispatch(new SetupBarangAction.UpdateBarangUrai(payload))
        //         .subscribe((result) => {
        //             if (result.setup_barang.entities.success) {
        //                 this._messageService.clear();
        //                 this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

        //                 this.FormDialog.onCloseFormDialog();

        //                 this.getDetailBarangUrai();
        //             }
        //         })
        // }
    }
}
