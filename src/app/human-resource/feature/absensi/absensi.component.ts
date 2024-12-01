import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

    KaryawanDatasource: any[] = [];

    Karyawan: any = null;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _absensiService: AbsensiService,
        private _SetupKaryawanService: SetupKaryawanService,
    ) {
        this.DashboardProps = {
            title: 'Data Absensi',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
                { id: 'export_pdf', caption: 'Export PDF', icon: 'pi pi-file-pdf text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'tanggal', headerName: 'TANGGAL', flex: 200, sortable: true, resizable: true },
                { field: 'nama_karyawan', headerName: 'NAMA KARYAWAN', flex: 300, sortable: true, resizable: true },
                { field: 'masuk1', headerName: 'MASUK 1', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', },
                { field: 'keluar1', headerName: 'KELUAR 1', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', },
                { field: 'masuk2', headerName: 'MASUK 2', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', },
                { field: 'keluar2', headerName: 'KELUAR 2', flex: 250, sortable: true, resizable: true, cellClass: 'text-center', },
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

                    this.KaryawanDatasource = result.data.map((item: any) => {
                        return { name: item.nama_karyawan, value: item.id_karyawan }
                    });
                }
            })
    }

    handleClickButtonNav(args: string): void {
        const startDate = this._utilityService.FormatDate(new Date(this.StartDate), 'yyyy-MM-DD'),
            endDate = this._utilityService.FormatDate(new Date(this.EndDate), 'yyyy-MM-DD');

        switch (args) {
            case 'add':
                this.FormDialogProps.type = 'add';
                this.FormDialog.onOpenFormDialog();
                break;
            case 'export_excel':


                const dataSource = this.GridProps.dataSource.map((item) => {
                    return {
                        tanggal: item.tanggal,
                        nama_karyawan: item.nama_karyawan,
                        masuk1: item.masuk1,
                        keluar1: item.total_qty,
                        masuk2: item.masuk2,
                        keluar2: item.keluar2,
                    }
                });

                this._utilityService.exportToExcel({ worksheetName: `Absensi Karyawan ${startDate} s.d ${endDate}`, dataSource: dataSource })
                break;
            case 'export_pdf':
                this._router.navigate([`human-resource/absensi/export-pdf/${startDate}/${endDate}/${this.Karyawan}`]);
                break;
            default:
                break;
        }
    }

    getAll(start: any, end: any, karyawan?: any): void {
        const startDate = this._utilityService.FormatDate(new Date(start), 'yyyy-MM-DD'),
            endDate = this._utilityService.FormatDate(new Date(end), 'yyyy-MM-DD');


        this._absensiService
            .getAll(startDate, endDate, karyawan)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data.data;
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

                    this.getAll(startDate, endDate, this.Karyawan);
                }
            })
    }

}
