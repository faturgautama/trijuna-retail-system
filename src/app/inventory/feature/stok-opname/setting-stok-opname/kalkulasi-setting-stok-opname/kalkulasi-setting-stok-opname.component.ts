import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { SettingStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/setting-stok-opname.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-kalkulasi-setting-stok-opname',
    templateUrl: './kalkulasi-setting-stok-opname.component.html',
    styleUrls: ['./kalkulasi-setting-stok-opname.component.scss']
})
export class KalkulasiSettingStokOpnameComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

    IsFinalisasi = false;

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        window.history.back();
    }

    constructor(
        private _router: Router,
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _authenticationService: AuthenticationService,
        private _settingStokOpnameService: SettingStokOpnameService
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'kode_barang', headerName: 'Kode Barang', },
                { field: 'barcode', headerName: 'Barcode', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'qty_fisik', headerName: 'Qty Fisik', class: 'text-end', format: 'number' },
                { field: 'qty_capture', headerName: 'Qty Capture', class: 'text-end', format: 'number' },
                { field: 'qty_selisih', headerName: 'Qty Selisih', class: 'text-end', format: 'number' },
                { field: 'hpp_average', headerName: 'HPP Average', class: 'text-end', format: 'number' },
                { field: 'harga_jual', headerName: 'Harga Jual', class: 'text-end', format: 'number' },
                { field: 'sub_total_fisik_harga_jual', headerName: 'Total Fisik Harga Jual', class: 'text-end', format: 'number' },
                { field: 'sub_total_capture_harga_jual', headerName: 'Total Capture Harga Jual', class: 'text-end', format: 'number' },
                { field: 'sub_total_selisih_harga_jual', headerName: 'Total Selisih Harga Jual', class: 'text-end', format: 'number' },
                { field: 'sub_total_fisik_hpp_average', headerName: 'Total Fisik HPP', class: 'text-end', format: 'number' },
                { field: 'sub_total_capture_hpp_average', headerName: 'Total Capture HPP', class: 'text-end', format: 'number' },
                { field: 'sub_total_selisih_hpp_average', headerName: 'Total Selisih HPP', class: 'text-end', format: 'number' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const id = this._activatedRoute.snapshot.params['id'];
        const url = this._router.url;
        const isExportPdf = url.includes('export-pdf');
        this.IsFinalisasi = url.includes('print-finalisasi');

        if (this.IsFinalisasi) {
            this.getFinalisasi(id, isExportPdf);
        } else {
            this.getDetail(id, isExportPdf);
        }

    }

    getDetail(id: any, exportPdf: boolean) {
        this._settingStokOpnameService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.getKalkulasi(id, exportPdf);
            })
    }

    getKalkulasi(id: any, exportPdf: boolean) {
        this._settingStokOpnameService
            .kalkulasi(id)
            .subscribe((result) => {
                this.GridProps.dataSource = result.data;

                if (!exportPdf) {
                    setTimeout(() => {
                        window.print();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printKalkulasiStokOpname', `Kalkulasi Stok Opname - ${this.Data.nomor_stok_opname} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }

    getFinalisasi(id: any, exportPdf: boolean) {
        this._settingStokOpnameService
            .print_finalisasi(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                if (!exportPdf) {
                    setTimeout(() => {
                        window.print();
                    }, 1500);
                } else {
                    setTimeout(() => {
                        this._utilityService.exportToPdf('printKalkulasiStokOpname', `Finalisasi Stok Opname - ${this.Data.nomor_stok_opname} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }


}
