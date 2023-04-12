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
import { SetupSatuanAction } from 'src/app/@shared/state/setup-data/setup-satuan';

@Component({
    selector: 'app-detail-barang-satuan',
    templateUrl: './detail-barang-satuan.component.html',
    styleUrls: ['./detail-barang-satuan.component.scss']
})
export class DetailBarangSatuanComponent implements OnInit {

    @Input('id_barang') id_barang: number = 0;

    GridBarangSatuanProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    SelectedData: SetupBarangModel.ISetupBarangSatuan = {} as any;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.GridBarangSatuanProps = {
            column: [
                { field: 'kode_satuan', headerName: 'KODE SATUAN', width: 300, sortable: true, resizable: true },
                { field: 'nama_satuan', headerName: 'NAMA SATUAN', width: 300, sortable: true, resizable: true },
                { field: 'isi', headerName: 'ISI', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'created_by', headerName: 'CREATED BY', width: 250, sortable: true, resizable: true, cellClass: 'text-center' },

            ],
            dataSource: [],
            height: '345px',
            toolbar: ['Add', 'Delete'],
        };

        this.FormDialogProps = {
            title: 'Setup Barang Satuan',
            type: 'add',
            form_props: {
                id: 'form_setup_barang_satuan',
                is_inline: true,
                fields: [
                    {
                        id: 'id_brang_satuan',
                        label: 'Id Barang Satuan',
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
                        id: 'id_satuan',
                        label: 'Satuan',
                        status: 'insert',
                        type: 'select',
                        required: true,
                        validator: 'Satuan Tidak Boleh Kosong',
                        select_props: [],
                    },
                    {
                        id: 'isi',
                        label: 'Isi',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                        validator: 'Isi Tidak Boleh Kosong',
                    }
                ],
                custom_class: 'grid-rows-2'
            }
        }
    }

    ngOnInit(): void {
        this.getDetailBarangSatuan();
        this.getDataSatuan();
    }

    getDetailBarangSatuan(): void {
        this._store.dispatch(new SetupBarangAction.GetAllBarangSatuan(this.id_barang))
            .pipe(
                map((result) => {
                    if (result.setup_barang.entities.status) {
                        return result.setup_barang.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                this.GridBarangSatuanProps.dataSource = result;
            })

    }

    getDataSatuan(): void {
        this._store.dispatch(new SetupSatuanAction.GetAll())
            .pipe(
                map((result) => {
                    if (result.setup_satuan.entities.success) {
                        return result.setup_satuan.entities.data;
                    } else {
                        return result;
                    }
                })
            )
            .subscribe((result) => {
                const indexSatuan = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'id_satuan' });

                this.FormDialogProps.form_props.fields[indexSatuan].select_props = result.map((item: any) => {
                    return { name: item.nama_satuan, value: item.id_satuan }
                });
            })
    }

    handleRowDoubleClicked(args: any): void {
        this.FormDialogProps.form_props.default_value = {
            id_brang_satuan: args.id_brang_satuan,
            id_barang: args.id_barang,
            id_satuan: args.id_satuan,
            isi: args.isi,
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
                this._store.dispatch(new SetupBarangAction.DeleteBarangSatuan(this.SelectedData.id_brang_satuan))
                    .subscribe((result) => {
                        if (result.setup_barang.entities.success) {
                            this._messageService.clear();
                            this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });

                            setTimeout(() => {
                                this.getDetailBarangSatuan();
                            }, 1500);
                        }
                    })
                break;
            default:
                break;
        }
    }

    handleSubmitForm(args: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupBarangModel.SaveSetupBarangSatuan = {
                id_barang: this.id_barang,
                id_satuan: args.id_satuan,
                isi: args.isi,
            };

            this._store.dispatch(new SetupBarangAction.SaveBarangSatuan(payload))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getDetailBarangSatuan();
                    }
                })
        } else {
            const payload: SetupBarangModel.UpdateSetupBarangSatuan = {
                id_brang_satuan: args.id_brang_satuan,
                id_barang: this.id_barang,
                id_satuan: args.id_satuan,
                isi: args.isi,
            };

            this._store.dispatch(new SetupBarangAction.UpdateBarangSatuan(payload))
                .subscribe((result) => {
                    if (result.setup_barang.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getDetailBarangSatuan();
                    }
                })
        }
    }
}
