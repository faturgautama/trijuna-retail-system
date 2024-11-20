import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { SettingStokOpnameService } from 'src/app/@core/service/inventory/stok-opname/setting-stok-opname.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-setting-stok-opname',
    templateUrl: './print-setting-stok-opname.component.html',
    styleUrls: ['./print-setting-stok-opname.component.scss']
})
export class PrintSettingStokOpnameComponent implements OnInit {

    UserData: any = this._authenticationService.userData;

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
                { field: 'kode_satuan', headerName: 'Satuan', },
                { field: 'qty_fisik', headerName: 'Qty Fisik', class: 'text-end', format: 'number' },
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

        this.getDetail(id, isExportPdf);
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
                        this._utilityService.exportToPdf('printKalkulasiStokOpname', `Setting Stok Opname - ${this.Data.nomor_stok_opname} - ${new Date().getTime()}`);
                    }, 500);
                }
            })
    }

}
