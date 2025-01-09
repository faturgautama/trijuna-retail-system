import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LaporanInventoryService } from 'src/app/@core/service/laporan/laporan-inventory.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-laporan-keluar-masuk-barang',
    templateUrl: './laporan-keluar-masuk-barang.component.html',
    styleUrls: ['./laporan-keluar-masuk-barang.component.scss']
})
export class LaporanKeluarMasukBarangComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    StartDate: any;

    EndDate: any;

    Jenis: any = 'group';

    JenisDatasource: any[] = [
        { name: 'Group', value: 'group' },
        { name: 'Divisi', value: 'divisi' },
        { name: 'SKU', value: 'sku' },
    ];

    constructor(
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _laporanInventoryService: LaporanInventoryService,
    ) {
        this.DashboardProps = {
            title: 'Laporan Keluar Masuk Barang',
            button_navigation: [
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'tanggal', headerName: 'TANGGAL', width: 150, sortable: true, resizable: true, cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value, 'dd-MM-yyyy') } },
                { field: 'kode', headerName: 'KODE', width: 150, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'uraian', headerName: 'NAMA', width: 350, sortable: true, resizable: true },
                { field: 'in', headerName: 'IN (PEMBELIAN)', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') } },
                { field: 'mutasi_masuk', headerName: 'MUTASI MASUK', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') }, },
                { field: 'mutasi_masuk', headerName: 'MUTASI KELUAR', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') }, },
                { field: 'penjualan', headerName: 'PENJUALAN', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') }, },
                { field: 'retur_pembelian', headerName: 'RETUR PEMBELIAN', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') }, },
                { field: 'stok_periode', headerName: 'STOK PERIODE', width: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') }, },
            ],
            dataSource: [],
            height: "calc(100vh - 16rem)",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        // this.handleSearchOffcanvas([]);
    }

    handleClickButtonNav(args: string): void {
        if (args == 'export_excel') {
            const dataSource = this.GridProps.dataSource.map((item) => {
                return {
                    kode: item.kode,
                    barcode: item.barcode,
                    uraian: item.uraian,
                    in: (item.in),
                    mutasi_masuk: (item.mutasi_masuk),
                    mutasi_keluar: (item.mutasi_keluar),
                    penjualan: (item.penjualan),
                    retur_pembelian: (item.retur_pembelian),
                    stok_periode: (item.stok_periode)
                }
            });

            this._utilityService.exportToExcel({ worksheetName: 'Laporan Keluar Masuk Barang', dataSource: dataSource })
        };
    }

    handleSearchOffcanvas(): void {
        const filter = {
            stardate: this._utilityService.FormatDate(new Date(this.StartDate), 'yyyy-MM-dd'),
            enddate: this._utilityService.FormatDate(new Date(this.EndDate), 'yyyy-MM-dd'),
            jenis: this.Jenis
        }

        this._laporanInventoryService
            .getLaporanKeluarMasukBarang(filter)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data;
                }
            })
    }

}
