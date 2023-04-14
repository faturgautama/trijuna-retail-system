import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { SetupRakModel } from 'src/app/@shared/models/setup-data/setup-rak.model';
import { SetupLokasiAction } from 'src/app/@shared/state/setup-data/setup-lokasi';

@Component({
    selector: 'app-setup-lokasi',
    templateUrl: './setup-lokasi.component.html',
    styleUrls: ['./setup-lokasi.component.scss']
})
export class SetupLokasiComponent implements OnInit {

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
            title: 'Data Setup Lokasi',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'kode_lokasi', headerName: 'KODE', width: 150, sortable: true, resizable: true },
                { field: 'nama_lokasi', headerName: 'NAMA', width: 300, sortable: true, resizable: true },
                { field: 'alamat', headerName: 'ALAMAT', width: 350, sortable: true, resizable: true },
                { field: 'telepon', headerName: 'TELEPON', width: 150, sortable: true, resizable: true },
                { field: 'npwp', headerName: 'NPWP', width: 150, sortable: true, resizable: true },
                { field: 'server', headerName: 'SERVER', width: 150, sortable: true, resizable: true },
                {
                    field: 'is_use', headerName: 'IS USE', width: 200, sortable: true, resizable: true, cellClass: 'text-center',
                    cellRenderer: (e: any) => {
                        return this._utilityService.IconBoolean(e.value)
                    }
                },
                { field: 'created_at', headerName: 'CREATED AT', width: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'is_active', headerName: 'IS ACTIVE', width: 200, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.IconBoolean(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Lokasi',
            type: 'add',
            form_props: {
                id: 'form_setup_lokasi',
                is_inline: true,
                fields: [
                    {
                        id: 'id_lokasi',
                        label: 'ID',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true
                    },
                    {
                        id: 'kode_lokasi',
                        label: 'Kode Lokasi',
                        status: 'readonly',
                        type: 'string',
                        required: true,
                        validator: 'Nama Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_lokasi',
                        label: 'Nama Lokasi',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Nama Tidak Boleh Kosong',
                    },
                    {
                        id: 'alamat',
                        label: 'Alamat',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Alamat Tidak Boleh Kosong',
                    },
                    {
                        id: 'telepon',
                        label: 'Telepon',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'Telepon Tidak Boleh Kosong',
                    },
                    {
                        id: 'npwp',
                        label: 'NPWP',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'NPWP Tidak Boleh Kosong',
                    },
                    {
                        id: 'server',
                        label: 'IP Server',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        validator: 'IP Server Tidak Boleh Kosong',
                    },
                    {
                        id: 'is_use',
                        label: 'Status Active',
                        status: 'insert',
                        type: 'radio',
                        radio_props: [
                            { id: 'is_use_true', name: 'Active', value: true },
                            { id: 'is_use_false', name: 'Non Active', value: false },
                        ],
                        required: true,
                        validator: 'Status Active Tidak Boleh Kosong',
                    },
                ],
                custom_class: 'grid-rows-7'
            },
        }
    }

    ngOnInit(): void {
        this.getAllLokasi();
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
            id_lokasi: args.id_lokasi,
            kode_lokasi: args.kode_lokasi,
            nama_lokasi: args.nama_lokasi,
            alamat: args.alamat,
            telepon: args.telepon,
            npwp: args.npwp,
            server: args.server,
            is_use: args.is_use,
        };

        this.FormDialogProps.type = 'edit';

        this.FormDialog.onOpenFormDialog();
    }

    getAllLokasi(): void {
        this._store.dispatch(new SetupLokasiAction.GetAll())
            .subscribe((result) => {
                if (result.setup_lokasi.entities.success) {
                    this.GridProps.dataSource = result.setup_lokasi.entities.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        if (this.FormDialogProps.type == 'add') {
            const payload: SetupLokasiModel.SaveSetupLokasi = {
                kode_lokasi: data.kode_lokasi,
                nama_lokasi: data.nama_lokasi,
                alamat: data.alamat,
                telepon: data.telepon,
                npwp: data.npwp,
                server: data.server,
                is_use: data.is_use,
            };

            this._store.dispatch(new SetupLokasiAction.Save(payload))
                .subscribe((result) => {
                    if (result.setup_lokasi.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllLokasi();
                    }
                })
        } else {
            this._store.dispatch(new SetupLokasiAction.Update(data))
                .subscribe((result) => {
                    if (result.setup_lokasi.entities.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diupdate' });

                        this.FormDialog.onCloseFormDialog();

                        this.getAllLokasi();
                    }
                })
        }
    }
}
