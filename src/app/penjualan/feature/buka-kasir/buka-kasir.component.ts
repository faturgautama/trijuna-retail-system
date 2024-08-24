import { formatDate } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { ModalKasirService } from 'src/app/@core/service/penjualan/modal-kasir/modal-kasir.service';
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
        private _bukaKasirService: ModalKasirService,
    ) {
        this.DashboardProps = {
            title: 'Modal Kasir',
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
                {
                    field: 'tanggal_modal_kasir', headerName: 'TGL. MODAL KASIR', flex: 250, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'nama_kasir', headerName: 'NAMA KASIR', flex: 500, sortable: true, resizable: true },
                {
                    field: 'modal_kasir', headerName: 'JUMLAH MODAL', flex: 300, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            toolbar: ['Delete'],
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
                        id: 'id_modal_kasir',
                        label: 'ID',
                        status: 'insert',
                        type: 'string',
                        required: true,
                        hidden: true,
                    },
                    {
                        id: 'tanggal_modal_kasir',
                        label: 'Tanggal',
                        status: 'insert',
                        type: 'date',
                        required: true,
                    },
                    {
                        id: 'id_user_kasir',
                        label: 'Pilih User Kasir',
                        status: 'insert',
                        type: 'select',
                        select_props: [],
                        required: true,
                    },
                    {
                        id: 'modal_kasir',
                        label: 'Modal Kasir',
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
        this.getUserKasir();
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this.FormDialog.onOpenFormDialog();
        }
    }

    handleSearchOffcanvas(args: any): void {
        this._bukaKasirService
            .getAll()
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    private getUserKasir() {
        this._bukaKasirService
            .getAllUserKasir()
            .subscribe((result) => {
                if (result.success) {
                    this.FormInputDetail.form_props.fields[2].select_props = result.data.map((item: any) => {
                        return {
                            name: item.nama,
                            value: item.id_user
                        }
                    });
                }
            })
    }

    handleRowDoubleClicked(args: any): void {
        this.FormDialog.onOpenFormDialog();
        this.FormInputDetail.type = 'edit';

        args.tanggal_modal_kasir = new Date(args.tanggal_modal_kasir);
        this.FormDialog.CustomForm.CustomForms.patchValue(args);
    }

    handleToolbarClicked(args: any): void {
        if (args.id == 'delete') {
            this._bukaKasirService
                .delete(args.data.id_modal_kasir)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Dihapus' });
                        this.handleSearchOffcanvas([]);
                    }
                });
        }
    }

    handleSubmitFormDetail(data: any): void {
        if (this.FormInputDetail.type == 'add') {
            const payload = {
                id_user_kasir: data.id_user_kasir,
                tanggal_modal_kasir: data.tanggal_modal_kasir,
                modal_kasir: data.modal_kasir,
            };

            this._bukaKasirService
                .insert(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        this.handleSearchOffcanvas([]);
                        this.FormDialog.onCloseFormDialog();
                    }
                });
        }

        if (this.FormInputDetail.type == 'edit') {
            const payload = {
                id_user_kasir: data.id_user_kasir,
                tanggal_modal_kasir: data.tanggal_modal_kasir,
                modal_kasir: data.modal_kasir,
            };

            this._bukaKasirService
                .update(data.id_modal_kasir, payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Diperbarui' });
                        this.handleSearchOffcanvas([]);
                        this.FormDialog.onCloseFormDialog();
                    }
                });
        }
    }
}
