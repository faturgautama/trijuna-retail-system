import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LaporanOmsetService } from 'src/app/@core/service/laporan/laporan-omset.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-laporan-omset-breakdown-daily',
    templateUrl: './laporan-omset-breakdown-daily.component.html',
    styleUrls: ['./laporan-omset-breakdown-daily.component.scss']
})
export class LaporanOmsetBreakdownDailyComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    StartDate: any;

    EndDate: any;

    TotalOmset = 0;

    TotalKumulatif = 0;

    TotalRataRata = 0;

    constructor(
        private _messageService: MessageService,
        private _utilityService: UtilityService,
        private _laporanOmsetService: LaporanOmsetService,
    ) {
        this.DashboardProps = {
            title: 'Laporan Omset Breakdown Daily',
            button_navigation: [
                { id: 'export_excel', caption: 'Excel', icon: 'pi pi-file-excel text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'urut', headerName: 'NO.', flex: 150, sortable: true, resizable: true },
                { field: 'hari', headerName: 'TANGGAL', flex: 150, sortable: true, resizable: true },
                { field: 'omset', headerName: 'OMSET', flex: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'komilatif', headerName: 'KUMULATIF', flex: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
                { field: 'rata_rata', headerName: 'RATA RATA', flex: 250, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') }, },
            ],
            dataSource: [],
            height: "calc(100vh - 20rem)",
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
                    hari: item.hari,
                    omset: (item.omset),
                    komilatif: (item.komilatif),
                    rata_rata: (item.rata_rata),
                }
            });

            this._utilityService.exportToExcel({ worksheetName: 'Laporan Omset Breakdown Daily', dataSource: dataSource })
        };
    }

    handleSearchOffcanvas(): void {
        const filter = {
            stardate: this._utilityService.FormatDate(new Date(this.StartDate), 'yyyy-MM'),
        }

        this._laporanOmsetService
            .getLaporanOmsetBreakdownDaily(filter.stardate)
            .subscribe((result) => {
                if (result.success) {
                    this.GridProps.dataSource = result.data.detail;
                    this.TotalOmset = result.data.total_omset;
                    this.TotalKumulatif = result.data.total_komulatif;
                    this.TotalRataRata = result.data.total_rata_rata;
                }
            })
    }

}
