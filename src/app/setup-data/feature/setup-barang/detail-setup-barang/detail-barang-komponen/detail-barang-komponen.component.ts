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
    selector: 'app-detail-barang-komponen',
    templateUrl: './detail-barang-komponen.component.html',
    styleUrls: ['./detail-barang-komponen.component.scss']
})
export class DetailBarangKomponenComponent implements OnInit {

    @Input('id_barang') id_barang: number = 0;

    GridBarangKomponenProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: SetupBarangModel.ISetupBarangKomponen = {} as any;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.GridBarangKomponenProps = {
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 250, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 250, sortable: true, resizable: true },
                { field: 'qty_komponen', headerName: 'QTY KOMPONEN', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 250, sortable: true, resizable: true, cellClass: 'text-center' },

            ],
            dataSource: [],
            height: '345px',
            toolbar: ['Add', 'Delete'],
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Barang Komponen',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_rak',
                is_inline: true,
                fields: [
                    {
                        id: 'id_barang_komponen',
                        label: 'Id Barang Komponen',
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
                        id: 'komponen_barang',
                        label: 'Komponen Barang',
                        status: 'readonly',
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
                            label: 'Komponen Barang',
                            selectedField: 'nama_barang',
                            selectedValue: 'id_barang',
                            url: `${environment.endpoint}/barang/by_param`
                        },
                        required: true,
                    },
                    {
                        id: 'qty_komponen',
                        label: 'Qty Komponen',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        validator: 'Qty Komponen Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-2'
            }
        }
    }

    ngOnInit(): void {
        this.getDetailBarangKomponen();
    }

    getDetailBarangKomponen(): void {
        this._store.dispatch(new SetupBarangAction.GetAllBarangKomponen(this.id_barang))
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
                this.GridBarangKomponenProps.dataSource = result;
            })

    }

    handleRowDoubleClicked(args: any): void {
        console.log(args);

        this.FormDialogProps.form_props.default_value = {
            id_barang_komponen: args.id_barang_komponen,
            id_barang: args.id_barang,
            komponen_barang: args.komponen_barang,
            qty_komponen: args.qty_komponen,
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
                this._store.dispatch(new SetupBarangAction.DeleteBarangKomponen(this.SelectedData.id_barang_komponen))
                    .subscribe((result) => {
                        if (result.setup_barang.entities.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            this.getDetailBarangKomponen();
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(args: any): void {
        console.log(args);

        if (this.FormDialogProps.type == 'add') {
            const payload: SetupBarangModel.SaveSetupBarangKomponen = {
                id_barang: this.id_barang,
                komponen_barang: args.komponen_barang,
                qty_komponen: args.qty_komponen,
            };

            this._store.dispatch(new SetupBarangAction.SaveBarangKomponen(payload))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getDetailBarangKomponen();
                    }
                })
        } else {
            const payload: SetupBarangModel.UpdateSetupBarangKomponen = {
                id_barang_komponen: args.id_barang_komponen,
                id_barang: this.id_barang,
                qty_komponen: args.qty_komponen,
            };

            this._store.dispatch(new SetupBarangAction.UpdateBarangKomponen(payload))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getDetailBarangKomponen();
                    }
                })
        }
    }
}
