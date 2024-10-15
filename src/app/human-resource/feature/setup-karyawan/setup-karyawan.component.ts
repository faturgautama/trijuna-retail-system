import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { SetupDepartemenService } from 'src/app/@core/service/human-resource/setup-departemen/setup-departemen.service';
import { SetupKaryawanService } from 'src/app/@core/service/human-resource/setup-karyawan/setup-karyawan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-setup-karyawan',
    templateUrl: './setup-karyawan.component.html',
    styleUrls: ['./setup-karyawan.component.scss']
})
export class SetupKaryawanComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupKaryawanService: SetupKaryawanService,
        private _setupDepartemenService: SetupDepartemenService,
    ) {
        this.DashboardProps = {
            title: 'Data Karyawan',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'kode_karyawan', headerName: 'KODE', flex: 200, sortable: true, resizable: true },
                { field: 'nama_karyawan', headerName: 'NAMA', flex: 350, sortable: true, resizable: true },
                { field: 'alamat', headerName: 'ALAMAT', flex: 750, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 11rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Setup Karyawan',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'id_karyawan',
                        label: 'Id Karyawan',
                        status: 'insert',
                        type: 'string',
                        hidden: true,
                        required: true,
                    },
                    {
                        id: 'id_departemen',
                        label: 'Departemen',
                        status: 'insert',
                        type: 'select',
                        required: true,
                        validator: 'Departemen Tidak Boleh Kosong',
                        select_props: []
                    },
                    {
                        id: 'kode_karyawan',
                        label: 'Kode Karyawan',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Kode Karyawan Tidak Boleh Kosong',
                    },
                    {
                        id: 'nama_karyawan',
                        label: 'Nama Karyawan',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: true,
                        validator: 'Nama Karyawan Tidak Boleh Kosong',
                    },
                    {
                        id: 'alamat',
                        label: 'Alamat',
                        status: 'insert',
                        type: 'string',
                        hidden: false,
                        required: false,
                    },
                ],
                custom_class: 'grid-rows-4'
            },
        }
    }

    ngOnInit(): void {
        this.getAllGroup();
        this.getAllDepartemen();
    }

    getAllDepartemen(): void {
        this._setupDepartemenService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    const indexGroup = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'id_departemen' });

                    this.FormDialogProps.form_props.fields[indexGroup].select_props = result.data.map((item: any) => {
                        return { name: item.divisi, value: item.id_divisi }
                    });
                }
            })
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
            id_karyawan: args.id_karyawan,
            kode_karyawan: args.kode_karyawan,
            nama_karyawan: args.nama_karyawan,
            alamat: args.alamat,
            id_departemen: args.id_departemen,
        };

        this.FormDialogProps.type = 'edit';
        this.FormDialog.onOpenFormDialog();
    }

    getAllGroup(): void {
        this._setupKaryawanService
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
                kode_karyawan: data.kode_karyawan,
                nama_karyawan: data.nama_karyawan,
                alamat: data.alamat,
                id_departemen: data.id_departemen,
            };

            this._setupKaryawanService
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
            this._setupKaryawanService
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
