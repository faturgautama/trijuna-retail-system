import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { AbsensiService } from 'src/app/@core/service/human-resource/absensi/absensi.service';
import { SetupKaryawanService } from 'src/app/@core/service/human-resource/setup-karyawan/setup-karyawan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-absensi',
    templateUrl: './absensi.component.html',
    styleUrls: ['./absensi.component.scss']
})
export class AbsensiComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    StartDate: any = new Date();

    EndDate: any = new Date();

    constructor(
        private _store: Store,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _absensiService: AbsensiService,
        private _SetupKaryawanService: SetupKaryawanService,
    ) {
        this.DashboardProps = {
            title: 'Data Absensi',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.GridProps = {
            column: [
                { field: 'kode_karyawan', headerName: 'KODE KARYAWAN', flex: 750, sortable: true, resizable: true },
                { field: 'nama_karyawan', headerName: 'NAMA KARYAWAN', flex: 750, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'CREATED AT', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 15rem)",
            showPaging: true,
        };

        this.FormDialogProps = {
            title: 'Absensi',
            type: 'add',
            form_props: {
                id: 'form_setup_user_group',
                is_inline: true,
                fields: [
                    {
                        id: 'kode_karyawan',
                        label: 'Karyawan',
                        status: 'insert',
                        type: 'select',
                        required: true,
                        validator: 'Karyawan Tidak Boleh Kosong',
                        select_props: []
                    },
                ],
                custom_class: 'grid-rows-1'
            },
        }
    }

    ngOnInit(): void {
        this.getAllKaryawan();

        const today = this._utilityService.FormatDate(new Date(), 'yyyy-MM-DD');
        this.getAll(today, today);
    }

    getAllKaryawan(): void {
        this._SetupKaryawanService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    const indexGroup = this.FormDialogProps.form_props.fields.findIndex((item) => { return item.id == 'kode_karyawan' });

                    this.FormDialogProps.form_props.fields[indexGroup].select_props = result.data.map((item: any) => {
                        return { name: item.nama_karyawan, value: item.kode_karyawan }
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

    getAll(start: any, end: any): void {
        const startDate = this._utilityService.FormatDate(new Date(start), 'yyyy-MM-DD'),
            endDate = this._utilityService.FormatDate(new Date(end), 'yyyy-MM-DD');

        this._absensiService
            .getAll(startDate, endDate)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleSubmitForm(data: any): void {
        this._absensiService
            .save(data)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                    this.FormDialog.onCloseFormDialog();

                    const startDate = this._utilityService.FormatDate(new Date(this.StartDate), 'yyyy-MM-DD'),
                        endDate = this._utilityService.FormatDate(new Date(this.EndDate), 'yyyy-MM-DD');

                    this.getAll(startDate, endDate);
                }
            })
    }

}
