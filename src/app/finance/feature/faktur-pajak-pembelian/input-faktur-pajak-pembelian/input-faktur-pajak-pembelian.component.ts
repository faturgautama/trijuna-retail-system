import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FakturPajakPembelianService } from 'src/app/@core/service/finance/faktur-pajak-pembelian/faktur-pajak-pembelian.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { CustomFormComponent } from 'src/app/@shared/components/custom-form/custom-form.component';
import { CustomFormModel } from 'src/app/@shared/models/components/custom-form.model';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-input-faktur-pajak-pembelian',
    templateUrl: './input-faktur-pajak-pembelian.component.html',
    styleUrls: ['./input-faktur-pajak-pembelian.component.scss']
})
export class InputFakturPajakPembelianComponent implements OnInit {

    PageState: 'form' | 'list' = 'list';

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    FormInputHeader: CustomFormModel.IForm;
    @ViewChild('CustomForm') CustomForm!: CustomFormComponent;

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _fakturPajakPembelianService: FakturPajakPembelianService,
    ) {
        this.DashboardProps = {
            title: 'Daftar Pembelian Belum Input Faktur Pajak',
            button_navigation: [
                { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                // { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
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
                    title: 'No. Nota',
                    type: 'string',
                    value: 'tp.no_nota',
                },
                {
                    id: 'tanggal_pemesanan',
                    title: 'Tgl. Nota',
                    type: 'date',
                    value: 'tp.tanggal_nota',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tp.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'nomor_pemesanan', headerName: 'NO. PEMESANAN', width: 170, sortable: true, resizable: true },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 200, sortable: true, resizable: true },
                { field: 'nomor_penerimaan', headerName: 'NO. PENERIMAAN', width: 200, sortable: true, resizable: true },
                { field: 'no_nota', headerName: 'NO. NOTA', width: 170, sortable: true, resizable: true },
                { field: 'tanggal_nota', headerName: 'TGL. NOTA', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'nama_lokasi', headerName: 'LOKASI', width: 170, sortable: true, resizable: true },
                { field: 'warehouse', headerName: 'WAREHOUSE', width: 170, sortable: true, resizable: true },
                { field: 'status_penerimaan', headerName: 'STATUS PENERIMAAN', width: 250, sortable: true, resizable: true },
                { field: 'qty', headerName: 'QTY', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'sub_total1', headerName: 'SUBTOTAL 1', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'diskon_persen', headerName: 'DISKON (%)', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'diskon_nominal', headerName: 'DISKON (Rp)', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'sub_total2', headerName: 'SUBTOTAL 2', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'ppn_nominal', headerName: 'PPn', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'pembulatan', headerName: 'PEMBULATAN', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_transaksi', headerName: 'TOTAL', width: 150, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'total_biaya_barcode', headerName: 'TOTAL BIAYA BARCODE', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'created_by', headerName: 'USER INPUT', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };

        this.FormInputHeader = {
            id: 'form_faktur_pajak_pembelian_header',
            type: 'save',
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
                    id: 'nomor_pemesanan',
                    label: 'No. Pemesanan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'tanggal_nota',
                    label: 'Tgl. Nota',
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
                    id: 'nomor_penerimaan',
                    label: 'No. Penerimaan',
                    status: 'readonly',
                    type: 'string',
                    required: false,
                },
                {
                    id: 'no_nota',
                    label: 'No. Nota',
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
                    type: 'date',
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
            custom_class: 'grid-rows-7 grid-cols-2',
        }
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'back') {
            this._router.navigate(['finance/faktur-pajak-pembelian/history']);
        };

        if (args == 'back_to_list') {
            this.PageState = 'list';
            this.DashboardProps = {
                title: 'Daftar Pembelian Belum Input Faktur Pajak',
                button_navigation: [
                    { id: 'back', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                    // { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
                ],
            };
        };

        if (args == 'save') {
            const formValue = this.CustomForm.CustomForms.value;
            const payload = {
                "id_penerimaan": formValue.id_penerimaan,
                "total_transaksi": formValue.total_transaksi,
                "dasar_pengenaan_pajak": formValue.dasar_pengenaan_pajak,
                "ppn": formValue.ppn,
                "no_seri": formValue.no_seri,
                "tanggal_faktur_pajak": formatDate(formValue.tanggal_faktur_pajak, 'yyyy-MM-dd', 'EN'),
                "nama_ttd_faktur": formValue.nama_ttd_faktur,
                "keterangan": formValue.keterangan
            };

            this._fakturPajakPembelianService
                .save(payload)
                .subscribe((result) => {
                    if (result.success) {
                        this._messageService.clear();
                        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Berhasil Disimpan' });
                        this.CustomForm.handleResetForm();
                        this.handleClickButtonNav('back');
                        this.handleSearchOffcanvas([]);
                    }
                })
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._fakturPajakPembelianService
            .getAllPembelianBelumInputFakturPajak(args)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

    handleCellClicked(args: any): void {
        this.SelectedData = args;
    }

    handleRowDoubleClicked(args: any): void {
        this.SelectedData = args;
        this.PageState = 'form';
        this.DashboardProps = {
            title: 'Input Faktur Pajak Pembelian',
            button_navigation: [
                { id: 'back_to_list', caption: 'Back', icon: 'pi pi-chevron-left text-xs' },
                { id: 'save', caption: 'Save', icon: 'pi pi-save text-xs' },
            ],
        };

        setTimeout(() => {
            this.CustomForm.CustomForms.patchValue(args);
        }, 500);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
