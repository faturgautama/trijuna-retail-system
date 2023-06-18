import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-buka-kasir',
    templateUrl: './buka-kasir.component.html',
    styleUrls: ['./buka-kasir.component.scss']
})
export class BukaKasirComponent {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    FormInputDetail: DialogModel.IFormDialog;
    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
    ) {
        this.DashboardProps = {
            title: 'Buka Kasir',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' }
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'warehouse_asal',
                    title: 'Nama Kasir',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'tanggal_mutasi',
                    title: 'Tgl. Buka Kasir',
                    type: 'date',
                    value: 'tp.tanggal_pemesanan',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'no_faktur', headerName: 'NO. FAKTUR', width: 250, sortable: true, resizable: true },
                {
                    field: 'tanggal_buka_kasir', headerName: 'TGL. BUKA KASIR', width: 250, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'nama_kasir', headerName: 'NAMA KASIR', width: 500, sortable: true, resizable: true },
                {
                    field: 'modal', headerName: 'JUMLAH MODAL', width: 300, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
            ],
            dataSource: [
                { no_faktur: 'TEST', tanggal_buka_kasir: new Date(), nama_kasir: 'Lisa', modal: 500000 }
            ],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };

        this.FormInputDetail = {
            title: 'Modal Kasir',
            type: 'add',
            form_props: {
                id: 'form_buka_kasir_detail',
                type: 'save',
                is_inline: true,
                fields: [
                    {
                        id: 'tanggal_buka_kasir',
                        label: 'Tanggal',
                        status: 'readonly',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'nama_kasir',
                        label: 'Nama Kasir',
                        status: 'insert',
                        type: 'select',
                        select_props: [
                            { name: 'Trial', value: 'trial' }
                        ],
                        required: true,
                    },
                    {
                        id: 'modal',
                        label: 'Modal',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                ],
                custom_class: 'grid-rows-3 grid-cols-1'
            },
            width: '40vw'
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this.FormDialog.onOpenFormDialog();
            this.FormDialog.CustomForm.handleSetFieldValue('tanggal_buka_kasir', formatDate(new Date(), 'dd MMMM yyyy', 'en'))
        }
    }

    handleSearchOffcanvas(args: any): void {
        // this._store.dispatch(new PemesananPoAction.GetAll(args))
        //     .subscribe((result) => {
        //         if (result.pemesanan_po.entities.success) {
        //             this.GridProps.dataSource = result.pemesanan_po.entities.data;
        //         }
        //     })
    }

    handleRowDoubleClicked(args: any): void {
        console.log(args);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

    handleSubmitFormDetail(data: any): void {
        this._messageService.clear();
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

        setTimeout(() => {
            data.no_faktur = 'TEST';
            this.GridProps.dataSource = [...this.GridProps.dataSource, data];
            this.FormDialog.onCloseFormDialog();
        }, 1500);
    }
}
