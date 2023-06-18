import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-input-tutup-kasir',
    templateUrl: './input-tutup-kasir.component.html',
    styleUrls: ['./input-tutup-kasir.component.scss']
})
export class InputTutupKasirComponent implements OnInit, AfterViewInit {

    DashboardProps: DashboardModel.IDashboard;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent

    GridDaftarModalProps: GridModel.IGrid;
    DaftarModalDatasource: any[] = [
        { id: 1, urut: 1, tambah_modal: 500000, waktu_entry: new Date() }
    ];

    DaftarPendapatanDatasource: any[] = [
        { id: 1, payment_method: 'CASH', pendapatan: 0 },
        { id: 2, payment_method: 'TRANSFER', pendapatan: 0 },
        { id: 3, payment_method: 'CREDIT CARD', pendapatan: 0 },
        { id: 4, payment_method: 'DEBIT CARD', pendapatan: 0 },
        { id: 5, payment_method: 'QRIS', pendapatan: 0 },
    ];

    constructor(
        private _store: Store,
        private _router: Router,
        private _messageService: MessageService,
        private _utilityService: UtilityService,
    ) {
        this.DashboardProps = {
            title: 'Input Tutup Kasir',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        this.FormInputHeader = {
            id: 'form_tutup_kasir_header',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'tanggal_buka_kasir',
                    label: 'Buka Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'user_kasir',
                    label: 'User Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: true,
                },
                {
                    id: 'keterangan',
                    label: 'Keterangan',
                    status: 'insert',
                    type: 'string',
                    required: true,
                },
            ],
            custom_class: 'grid-rows-1 grid-cols-3',
        };

        this.GridDaftarModalProps = {
            column: [
                { field: 'urut', headerName: 'URUT', width: 120, sortable: true, resizable: true },
                { field: 'id', headerName: 'ID BARANG', width: 350, sortable: true, resizable: true, hide: true, },
                {
                    field: 'tambah_modal', headerName: 'TAMBAH MODAL', width: 300, sortable: true, resizable: true, cellClass: 'text-right',
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatNumber(e.value, 'Rp. ') : e }
                },
                {
                    field: 'waktu_entry', headerName: 'WAKTU ENTRY', width: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return e ? this._utilityService.FormatDate(e.value) : e }
                },
            ],
            dataSource: this.DaftarModalDatasource,
            height: "calc(100vh - 20rem)",
            showPaging: false,
        };
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.CustomForm.handleSetFieldValue('tanggal_buka_kasir', formatDate(new Date(), 'dd/MM/yyyy', 'en'));
            this.CustomForm.handleSetFieldValue('user_kasir', 'Admin');
        }, 1);
    }

    handleClickButtonNav(args: string): void {
        switch (args) {
            case 'back':
                this._router.navigate(['penjualan/tutup-kasir/history']);
                break;
            case 'save':
                this.handleSubmitForm();
                break;
            default:
                break;
        }
    }

    handleChangeJumlahPendapatan(args: any, item: any): void {
        this.DaftarPendapatanDatasource = this.DaftarPendapatanDatasource.filter((data) => {
            if (data.payment_method == item.payment_method) {
                data.pendapatan = args.value;
            };

            return data;
        });
    }

    handleSubmitForm(): void {
        const header = this.CustomForm.handleSubmitForm();
        header.detail = this.DaftarPendapatanDatasource;

        this._messageService.clear();
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

        setTimeout(() => {
            this._router.navigate(['penjualan/tutup-kasir/history']);
        }, 1500);
    }
}
