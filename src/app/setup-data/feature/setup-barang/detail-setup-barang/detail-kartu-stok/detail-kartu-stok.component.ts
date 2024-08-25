import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';
import { SetupWarehouseService } from 'src/app/@core/service/setup-data/setup-warehouse/setup-warehouse.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';

@Component({
    selector: 'app-detail-kartu-stok',
    templateUrl: './detail-kartu-stok.component.html',
    styleUrls: ['./detail-kartu-stok.component.scss']
})
export class DetailKartuStokComponent implements OnInit {

    @Input('id_barang') id_barang: number = 0;

    GridBarangSatuanProps: GridModel.IGrid;

    SelectedData: SetupBarangModel.ISetupBarangSatuan = {} as any;

    WarehouseDatasource: any[] = [];

    Tanggal: any;
    Warehouse: any;

    constructor(
        private _utilityService: UtilityService,
        private _messageService: MessageService,
        private _setupBarangService: SetupBarangService,
        private _setupWarehouseService: SetupWarehouseService,
    ) {
        this.GridBarangSatuanProps = {
            column: [
                { field: 'tanggal', headerName: 'TANGGAL', width: 150, sortable: true, resizable: true, cellClass: 'text-center', cellRenderer: (e: any) => { return this._utilityService.FormatDate(e.value) } },
                { field: 'kode_satuan', headerName: 'KODE SATUAN', width: 300, sortable: true, resizable: true },
                { field: 'nama_satuan', headerName: 'NAMA SATUAN', width: 300, sortable: true, resizable: true },
                { field: 'stok_awal', headerName: 'STOK AWAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'nominal_awal', headerName: 'NOMINAL AWAL', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'stok_masuk', headerName: 'STOK MASUK', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'nominal_masuk', headerName: 'NOMINAL MASUK', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'stok_keluar', headerName: 'STOK KELUAR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'nominal_keluar', headerName: 'NOMINAL KELUAR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'stok_akhir', headerName: 'STOK AKHIR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value) } },
                { field: 'nominal_akhir', headerName: 'NOMINAL AKHIR', width: 200, sortable: true, resizable: true, cellClass: 'text-right', cellRenderer: (e: any) => { return this._utilityService.FormatNumber(e.value, 'Rp. ') } },
                { field: 'keterangan', headerName: 'KETERANGAN', width: 200, sortable: true, resizable: true, },
            ],
            dataSource: [],
            height: 'calc(100vh - 19rem)',
            toolbar: [],
            showPaging: true,
        };
    }

    ngOnInit(): void {
        this.getWarehouse();
    }

    getKartuStokBarang(): void {
        const payload = {
            start: this._utilityService.FormatDate(this.Tanggal[0], 'yyyy-MM-DD'),
            end: this._utilityService.FormatDate(this.Tanggal[1], 'yyyy-MM-DD'),
            id_barang: parseInt(this.id_barang as any),
            id_warehouse: this.Warehouse
        };

        this._setupBarangService
            .getKartuStokBarang(payload)
            .subscribe((result) => {
                this.GridBarangSatuanProps.dataSource = result.data;
            })
    }

    private getWarehouse() {
        this._setupWarehouseService
            .getAllWarehouse()
            .subscribe((result) => {
                this.WarehouseDatasource = result.data;
            })
    }
}
