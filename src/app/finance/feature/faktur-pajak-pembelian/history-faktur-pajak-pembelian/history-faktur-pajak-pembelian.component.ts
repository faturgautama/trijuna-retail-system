import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FakturPajakPembelianService } from 'src/app/@core/service/finance/faktur-pajak-pembelian/faktur-pajak-pembelian.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-history-faktur-pajak-pembelian',
    templateUrl: './history-faktur-pajak-pembelian.component.html',
    styleUrls: ['./history-faktur-pajak-pembelian.component.scss']
})
export class HistoryFakturPajakPembelianComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    SelectedData: any;

    OffcanvasFilterProps: FilterModel.IOffcanvasFilter;

    constructor(
        private _router: Router,
        private _utilityService: UtilityService,
        private _fakturPajakPembelianService: FakturPajakPembelianService,
    ) {
        this.DashboardProps = {
            title: 'History Faktur Pajak Pembelian',
            button_navigation: [
                { id: 'add', caption: 'Add', icon: 'pi pi-plus text-xs' },
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.OffcanvasFilterProps = {
            filter: [
                {
                    id: 'kode_supplier',
                    title: 'Kode Supplier',
                    type: 'string',
                    value: 'ms.kode_supplier',
                },
                {
                    id: 'nama_supplier',
                    title: 'Nama Supplier',
                    type: 'string',
                    value: 'ms.nama_supplier',
                },
                {
                    id: 'nomor_penerimaan',
                    title: 'No. Penerimaan',
                    type: 'string',
                    value: 'tp.nomor_penerimaan',
                },
                {
                    id: 'tanggal_nota',
                    title: 'Tgl. Nota',
                    type: 'date',
                    value: 'tp.tanggal_nota',
                },
                {
                    id: 'no_seri',
                    title: 'No. Seri',
                    type: 'string',
                    value: 'tfp.no_seri',
                },
                {
                    id: 'no_seri',
                    title: 'No. Seri',
                    type: 'string',
                    value: 'tfp.no_seri',
                },
                {
                    id: 'tanggal_faktur_pajak',
                    title: 'Tgl. Faktur Pajak',
                    type: 'string',
                    value: 'tfp.no_stanggal_faktur_pajakeri',
                },
                {
                    id: 'nama_ttd_faktur',
                    title: 'Nama Ttd Faktur',
                    type: 'string',
                    value: 'tfp.nama_ttd_faktur',
                },
                {
                    id: ' created_at',
                    title: 'Waktu Input',
                    type: 'date',
                    value: 'tfp.created_at',
                },
            ],
        }

        this.GridProps = {
            column: [
                { field: 'is_retur', headerName: 'IS RETUR', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return e.value ? '<i class="pi pi-check text-green-500"></i>' : '<i class="pi pi-times text-red-500"></i>' } },
                { field: 'nomor_penerimaan', headerName: 'NO. PENERIMAAN', width: 170, sortable: true, resizable: true },
                { field: 'tanggal_nota', headerName: 'TGL. NOTA', width: 150, sortable: true, resizable: true },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', width: 150, sortable: true, resizable: true },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', width: 250, sortable: true, resizable: true },
                { field: 'no_seri', headerName: 'NO. SERI', width: 170, sortable: true, resizable: true },
                { field: 'tanggal_faktur_pajak', headerName: 'TGL. FAKTUR PAJAK', width: 200, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'nama_ttd_faktur', headerName: 'NAMA TTD FAKTUR', width: 200, sortable: true, resizable: true },
                { field: 'tanggal_bayar', headerName: 'TGL. BAYAR', width: 170, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'dasar_pengenaan_pajak', headerName: 'DASAR PENGENAAN PAJAK', width: 230, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'ppn', headerName: 'PPn', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'created_by', headerName: 'USER INPUT', width: 150, sortable: true, resizable: true },
                { field: 'created_at', headerName: 'WAKTU ENTRY', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 14rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'add') {
            this._router.navigate(['finance/faktur-pajak-pembelian/input']);
        };

        if (args == 'print') {
            this._router.navigate([`finance/faktur-pajak-pembelian/print/${this.SelectedData.id_faktur_pajak}`]);
        };
    }

    handleSearchOffcanvas(args: any): void {
        this._fakturPajakPembelianService
            .getAll(args)
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
        this._router.navigate(['finance/faktur-pajak-pembelian/detail', args.id_faktur_pajak]);
    }

    handleToolbarClicked(args: any): void {
        console.log(args);
    }

}
