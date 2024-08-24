import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { CroscekTutupKasirService } from 'src/app/@core/service/penjualan/croscek-tutup-kasir/croscek-tutup-kasir.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-input-croscek-tutup-kasir',
    templateUrl: './input-croscek-tutup-kasir.component.html',
    styleUrls: ['./input-croscek-tutup-kasir.component.scss']
})
export class InputCroscekTutupKasirComponent implements OnInit {

    PageState: 'list' | 'detail' = 'list';

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    GridDetailProps: GridModel.IGrid;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    ShowDialogValidasi = false;

    IdTutupKasir = 0;
    TanggalKroscekTutupKasir = new Date();
    KeteranganTutupKasir = "";

    constructor(
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _croscekTutupKasirService: CroscekTutupKasirService,
    ) {
        this.DashboardProps = {
            title: 'Input Croscek Tutup Kasir',
            button_navigation: [],
        };

        this.GridProps = {
            column: [
                {
                    field: 'tanggal_tutup_kasir', headerName: 'TGL. TUTUP KASIR', flex: 200, sortable: true, resizable: true,
                    cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) }
                },
                { field: 'nama', headerName: 'USER KASIR', flex: 150, sortable: true, resizable: true },
                {
                    field: 'modal_kasir', headerName: 'MODAL', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'penerimaan', headerName: 'PENERIMAAN', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'pengeluaran', headerName: 'PENGELUARAN', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'sisa_saldo', headerName: 'SISA SALDO', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                { field: 'status_tutup_kasir', headerName: 'STATUS', flex: 150, sortable: true, resizable: true },
            ],
            dataSource: [],
            height: "calc(100vh - 14.5rem)",
            showPaging: true,
        };

        this.GridDetailProps = {
            column: [
                {
                    field: 'nama_payment_method', headerName: 'METODE BAYAR', flex: 200, sortable: true, resizable: true,
                },
                {
                    field: 'nominal', headerName: 'NOMINAL', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'nominal_sistem', headerName: 'NOMINAL SISTEM', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
                {
                    field: 'selisih', headerName: 'SELISIH', flex: 200, sortable: true, resizable: true,
                    cellClass: 'text-end',
                    cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }
                },
            ],
            dataSource: [],
            height: "calc(100vh - 18rem)",
            showPaging: true,
        };

        this.FormInputHeader = {
            id: 'form_detail_croscek_tutup_kasir',
            type: 'save',
            is_inline: true,
            fields: [
                {
                    id: 'nama_kasir',
                    label: 'Nama Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_tutup_kasir',
                    label: 'Tgl. Tutup Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'modal_kasir',
                    label: 'Modal Kasir',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'penerimaan',
                    label: 'Penerimaan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'pengeluaran',
                    label: 'Pengeluaran',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'sisa_saldo',
                    label: 'Sisa Saldo',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
            ],
            custom_class: 'grid-rows-2 grid-cols-3',
        }
    }

    ngOnInit(): void {
        this.getBelumKroscek();
    }

    private getBelumKroscek() {
        this._croscekTutupKasirService
            .getAllBelumCroscek()
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;
            })
    }

    handleRowDoubleClicked(args: any): void {
        this._croscekTutupKasirService
            .getDetailBelumCroscek(args.id_tutup_kasir)
            .subscribe((result) => {
                if (result.success) {
                    this.PageState = 'detail';
                    setTimeout(() => {
                        this.DashboardProps = {
                            title: 'Input Croscek Tutup Kasir',
                            button_navigation: [
                                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                                { id: 'validasi', caption: 'Validasi', icon: 'pi pi-save text-xs' },
                            ],
                        };

                        result.data.modal_kasir = this._utilityService.FormatNumber(result.data.modal_kasir, 'Rp. ');
                        result.data.pengeluaran = this._utilityService.FormatNumber(result.data.pengeluaran, 'Rp. ');
                        result.data.penerimaan = this._utilityService.FormatNumber(result.data.penerimaan, 'Rp. ');
                        result.data.sisa_saldo = this._utilityService.FormatNumber(result.data.sisa_saldo, 'Rp. ');

                        this.CustomForm.CustomForms.patchValue(result.data);
                        this.IdTutupKasir = result.data.id_tutup_kasir;
                        this.GridDetailProps.dataSource = [];
                        this.GridDetailProps.dataSource = result.data.pendapatan;
                    }, 1000);
                }
            })
    }

    handleClickButtonNav(args: any): void {
        if (args == 'back') {
            this.PageState = 'list';
            this.DashboardProps = {
                title: 'Input Croscek Tutup Kasir',
                button_navigation: [],
            };
        };

        if (args == 'validasi') {
            this.ShowDialogValidasi = true;
        };
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

    handleValidasi() {
        const payload = {
            "id_tutup_kasir": this.IdTutupKasir,
            "tanggal_kroscek_tutup_kasir": this._utilityService.FormatDate(new Date(this.TanggalKroscekTutupKasir), 'yyyy-MM-DD'),
            "keterangan": this.KeteranganTutupKasir
        };

        this._croscekTutupKasirService
            .validasi(payload)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Validasi Tutup Kasir Berhasil' });
                    this.GridDetailProps.dataSource = [];
                    this.PageState = 'list';
                }
            })
    }
}
