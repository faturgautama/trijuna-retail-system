import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LaporanPenjualanService } from 'src/app/@core/service/laporan/laporan-penjualan.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-laporan-penjualan-rokok',
    templateUrl: './laporan-penjualan-rokok.component.html',
    styleUrls: ['./laporan-penjualan-rokok.component.scss']
})
export class LaporanPenjualanRokokComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    StartDate: any;

    EndDate: any;

    TotalQty = 0;

    TotalNilai = 0;

    constructor(
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _laporanInventoryService: LaporanPenjualanService,
    ) {
        this.DashboardProps = {
            title: 'Laporan Penjualan Rokok',
            button_navigation: [
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'tahun', headerName: 'TAHUN', flex: 150, sortable: true, resizable: true },
                { field: 'bulan', headerName: 'BULAN', flex: 150, sortable: true, resizable: true },
                { field: 'group', headerName: 'GROUP', flex: 150, sortable: true, resizable: true },
                { field: 'omset_qty', headerName: 'QTY', flex: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, '') } },
                { field: 'omset_nilai', headerName: 'NILAI', flex: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
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
                    tahun: item.tahun,
                    bulan: item.bulan,
                    group: item.group,
                    omset_qty: (item.omset_qty),
                    omset_nilai: (item.omset_nilai),
                }
            });

            this._utilityService.exportToExcel({ worksheetName: 'Laporan Penjualan Rokok', dataSource: dataSource })
        };
    }

    handleSearchOffcanvas(): void {
        const filter = {
            stardate: this._utilityService.FormatDate(new Date(this.StartDate), 'yyyy-MM'),
            enddate: this._utilityService.FormatDate(new Date(this.EndDate), 'yyyy-MM'),
        }

        this._laporanInventoryService
            .getLaporanPenjualanRokok(filter.stardate, filter.enddate)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data.detail;
                    this.TotalQty = result.data.total_qty;
                    this.TotalNilai = result.data.total_nilai;
                }
            })
    }


}
