import { Component, OnInit } from '@angular/core';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { DashboardModel } from 'src/app/@shared/models/components/dashboard.model';
import { GridModel } from 'src/app/@shared/models/components/grid.model';

@Component({
    selector: 'app-cetak-label-harga-barang',
    templateUrl: './cetak-label-harga-barang.component.html',
    styleUrls: ['./cetak-label-harga-barang.component.scss']
})
export class CetakLabelHargaBarangComponent implements OnInit {

    DashboardProps: DashboardModel.IDashboard;

    GridProps: GridModel.IGrid;

    constructor(
        private _utilityService: UtilityService,
        private _setupBarangService: SetupBarangService,
    ) {
        this.DashboardProps = {
            title: 'Cetak Label Harga',
            button_navigation: [
                { id: 'print', caption: 'Print', icon: 'pi pi-print text-xs' },
            ],
        };

        this.GridProps = {
            column: [
                { field: 'id_barang', headerName: 'ID BARANG', width: 170, sortable: true, resizable: true, hide: true },
                { field: 'kode_barang', headerName: 'KODE BARANG', width: 170, sortable: true, resizable: true },
                { field: 'barcode', headerName: 'BARCODE', width: 150, sortable: true, resizable: true },
                { field: 'nama_barang', headerName: 'NAMA BARANG', width: 300, sortable: true, resizable: true },
                { field: 'jumlah_print', headerName: 'JUMLAH PRINT', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
            ],
            dataSource: [],
            height: "calc(100vh - 22rem)",
            showPaging: true,
        };
    }

    ngOnInit(): void {

    }

    handleClickButtonNav(args: string): void {

    }
}
