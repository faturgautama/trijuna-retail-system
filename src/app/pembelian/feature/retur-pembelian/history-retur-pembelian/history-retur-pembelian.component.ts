import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FakturPajakPembelianService } from 'src/app/@core/service/finance/faktur-pajak-pembelian/faktur-pajak-pembelian.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { FormDialogComponent } from 'src/app/@shared/components/dialog/form-dialog/form-dialog.component';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { DialogModel } from 'src/app/@shared/models/components/dialog.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { ReturPembelianAction } from 'src/app/@shared/state/pembelian/retur-pembelian';

@Component({
    selector: 'app-history-retur-pembelian',
    templateUrl: './history-retur-pembelian.component.html',
    styleUrls: ['./history-retur-pembelian.component.scss']
})
export class HistoryReturPembelianComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    SelectedData: any;

    @ViewChild('FormDialog') FormDialog!: FormDialogComponent;
    FormDialogProps: DialogModel.IFormDialog;

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _fakturPajakPembelianService: FakturPajakPembelianService,
    ) {
        this.DashboardProps = {
            title: 'History Retur Pembelian',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                { id: 'faktur_pajak', caption: 'Input Faktur Pajak', icon: 'pi pi-file text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'nomor_retur_pembelian', headerName: 'NO. RETUR', width: 170, sortable: true, resizable: true },
                { field: 'status_retur', headerName: 'STATUS', width: 150, sortable: true, resizable: true },
                { field: 'tanggal_retur_pembelian', headerName: 'TGL. RETUR', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 150, sortable: true, resizable: true },
                { field: 'qty', headerName: 'JUMLAH ITEM', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'total_harga', headerName: 'SUBTOTAL ', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'created_by', headerName: 'USER INPUT', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'nama_supplier',
                    title: 'Nama Supplier',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'nomor_pemesanan',
                    title: 'No. Pemesanan',
                    type: 'string',
                    value: 'tp.nomor_pemesanan',
                },
                {
                    id: 'tanggal_pemesanan',
                    title: 'Tgl. Pemesanan',
                    type: 'date',
                    value: 'tp.tanggal_pemesanan',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tp.created_at',
                },
            ],
        };

        this.FormDialogProps = {
            title: 'Input Faktur Pajak Retur',
            type: 'add',
            form_props: {
                id: 'form_faktur_pajak_retur',
                is_inline: true,
                fields: [
                    {
                        id: 'id_penerimaan',
                        label: 'Id Penerimaan',
                        status: 'insert',
                        type: 'string',
                        required: false,
                        hidden: true
                    },
                    {
                        id: 'nomor_retur_pembelian',
                        label: 'No. Retur',
                        status: 'readonly',
                        type: 'string',
                        required: false,
                    },
                    {
                        id: 'tanggal_retur_pembelian',
                        label: 'Tgl. Retur',
                        status: 'readonly',
                        type: 'string',
                        required: false,
                    },
                    {
                        id: 'kode_supplier',
                        label: 'Kode Supplier',
                        status: 'readonly',
                        type: 'string',
                        required: false,
                    },
                    {
                        id: 'nama_supplier',
                        label: 'Nama Supplier',
                        status: 'readonly',
                        type: 'string',
                        required: false,
                    },
                    {
                        id: 'mekanisme_keterangan',
                        label: 'Mekanisme Retur',
                        status: 'readonly',
                        type: 'string',
                        required: false,
                    },
                    {
                        id: 'total_transaksi',
                        label: 'Total Transaksi',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'dasar_pengenaan_pajak',
                        label: 'Dasar P. Pajak',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'ppn',
                        label: 'PPn',
                        status: 'insert',
                        type: 'numeric',
                        required: true,
                    },
                    {
                        id: 'no_seri',
                        label: 'No. Seri',
                        status: 'insert',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'tanggal_faktur_pajak',
                        label: 'Tgl. Faktur Pajak',
                        status: 'insert',
                        type: 'datetime',
                        required: true,
                    },
                    {
                        id: 'nama_ttd_faktur',
                        label: 'Nama Ttd Faktur',
                        status: 'insert',
                        type: 'string',
                        required: true,
                    },
                    {
                        id: 'keterangan',
                        label: 'Keterangan',
                        status: 'insert',
                        type: 'string',
                        required: false,
                    },
                ],
                custom_class: 'grid-cols-2 grid-rows-6 grid-flow-col',
                type: 'save',
            },
            width: '50rem'
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this._router.navigate(['pembelian/retur-pembelian/input']);
        };

        if (args == 'print') {
            this._router.navigate([`pembelian/retur-pembelian/print/${this.SelectedData.id_retur_pembelian}`]);
        };

        if (args == 'faktur_pajak') {
            this.FormDialog.onOpenFormDialog();
            this.FormDialog.CustomForm.CustomForms.get('id_penerimaan')?.setValue(this.SelectedData.id_retur_pembelian);
            this.FormDialog.CustomForm.CustomForms.get('nomor_retur_pembelian')?.setValue(this.SelectedData.nomor_retur_pembelian);
            this.FormDialog.CustomForm.CustomForms.get('tanggal_retur_pembelian')?.setValue(this.SelectedData.tanggal_retur_pembelian);
            this.FormDialog.CustomForm.CustomForms.get('kode_supplier')?.setValue(this.SelectedData.kode_supplier);
            this.FormDialog.CustomForm.CustomForms.get('nama_supplier')?.setValue(this.SelectedData.nama_supplier);
            this.FormDialog.CustomForm.CustomForms.get('mekanisme_keterangan')?.setValue(this.SelectedData.mekanisme_keterangan);
            this.FormDialog.CustomForm.CustomForms.get('total_transaksi')?.setValue(this.SelectedData.total_harga);
            this.FormDialog.CustomForm.CustomForms.get('dasar_pengenaan_pajak')?.setValue(0);
            this.FormDialog.CustomForm.CustomForms.get('ppn')?.setValue(0);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._store.dispatch(new ReturPembelianAction.GetAll(args))
            .subscribe((result) => {
                if (result.retur_pembelian.entities.success) {
                    this.GridProps.dataSource = result.retur_pembelian.entities.data;
                }
            })
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
        console.log("selected data =>", args);
    }

    handleRowDoubleClicked(args: any): void {
        this._router.navigate(['pembelian/retur-pembelian/detail', args.id_retur_pembelian]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

    handleSubmitForm(args: any) {
        const payload = {
            "id_penerimaan": args.id_penerimaan,
            "total_transaksi": args.total_transaksi,
            "dasar_pengenaan_pajak": args.dasar_pengenaan_pajak,
            "ppn": args.ppn,
            "no_seri": args.no_seri,
            "tanggal_faktur_pajak": this._utilityService.FormatDate(args.tanggal_faktur_pajak, 'yyyy-MM-DD HH:mm:ss'),
            "nama_ttd_faktur": args.nama_ttd_faktur,
            "keterangan": args.keterangan,
            "is_retur": true
        };

        this._confirmationService.confirm({
            target: (<any>event).target as EventTarget,
            message: 'Apakah Anda Ingin Melihat History Faktur Pajak? ',
            header: 'Data Akan Disimpan',
            icon: 'pi pi-question-circle',
            acceptButtonStyleClass: "p-button-info p-button-sm",
            rejectButtonStyleClass: "p-button-secondary p-button-sm",
            acceptIcon: "none",
            acceptLabel: 'Iya, Simpan dan Lihat History',
            rejectIcon: "none",
            rejectLabel: 'Tidak, Simpan Saja',
            accept: () => {
                this.onSaveWithCondition(true, payload)
            },
            reject: (args: any) => {
                if (args == 1) {
                    this.onSaveWithCondition(false, payload)
                }
            },
        });
    }

    private onSaveWithCondition(goToHistory: boolean, data: any) {
        this._fakturPajakPembelianService
            .save(data)
            .subscribe((result) => {
                if (result.success) {
                    this._messageService.clear();
                    this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });

                    if (goToHistory) {
                        setTimeout(() => {
                            this._router.navigate(['finance/faktur-pajak-pembelian/history']);
                        }, 2000);
                    } else {
                        this.FormDialog.CustomForm.CustomForms.reset();
                        this.FormDialog.onCloseFormDialog();
                        this.handleSearchOffcanvas([]);
                    }
                }
            })
    }
}
