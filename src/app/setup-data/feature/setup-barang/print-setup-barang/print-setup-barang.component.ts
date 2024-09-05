import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { GridModel } from 'src/app/@shared/models/components/grid.model';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';
import { SetupBarangAction } from 'src/app/@shared/state/setup-data/setup-barang';

@Component({
    selector: 'app-print-setup-barang',
    templateUrl: './print-setup-barang.component.html',
    styleUrls: ['./print-setup-barang.component.scss']
})
export class PrintSetupBarangComponent implements OnInit, OnDestroy {

    UserData: any = this._authenticationService.userData;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        this._router.navigate(['setup-data/setup-inventory/setup-barang/list']);
    }

    constructor(
        private _store: Store,
        private _router: Router,
        private _utilityService: UtilityService,
        private _authenticationService: AuthenticationService,
    ) {
        this.GridProps = {
            id: 'print-out-master-barang',
            column: [
                { field: 'kode_barang', headerName: 'KODE BARANG', },
                { field: 'nama_barang', headerName: 'NAMA BARANG', },
                { field: 'barcode', headerName: 'BARCODE', },
                { field: 'nama_satuan', headerName: 'SATUAN', },
                { field: 'harga_jual', headerName: 'HARGA JUAL', class: 'text-end', format: 'currency' },
                { field: 'created_at', headerName: 'TANGGAL DIBUAT', format: 'date' },
                { field: 'kode_supplier', headerName: 'KODE SUPPLIER', },
                { field: 'nama_supplier', headerName: 'NAMA SUPPLIER', },
                { field: 'stok_toko', headerName: 'STOK TOKO', class: 'text-end', format: 'number' },
                { field: 'stok_gudang', headerName: 'STOK GUDANG', class: 'text-end', format: 'number' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        const filter = localStorage.getItem("_TRS_BRG_SEARCH_");

        if (filter) {
            this.handleSearchDatasource(JSON.parse(filter));
        }
    }

    ngOnDestroy(): void {
        localStorage.removeItem("_TRS_BRG_SEARCH_");
    }

    handleSearchDatasource(args: any): void {
        this._store
            .dispatch(new SetupBarangAction.GetAllBarang(args))
            .subscribe((result) => {
                if (result.setup_barang.entities.success) {
                    this.GridProps.dataSource = result.setup_barang.entities.data;

                    setTimeout(() => {
                        window.print();
                    }, 1500);
                }
            })
    }
}
