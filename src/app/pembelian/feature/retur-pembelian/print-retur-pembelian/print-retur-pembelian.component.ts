import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/@core/service/authentication/authentication.service';
import { ReturPembelianService } from 'src/app/@core/service/pembelian/retur-pembelian/retur-pembelian.service';
import { SetupSupplierService } from 'src/app/@core/service/setup-data/setup-supplier/setup-supplier.service';
import { UtilityService } from 'src/app/@core/service/utility/utility.service';
import { PrintOutGridModel } from 'src/app/@shared/models/components/print-out-grid.model';

@Component({
    selector: 'app-print-retur-pembelian',
    templateUrl: './print-retur-pembelian.component.html',
    styleUrls: ['./print-retur-pembelian.component.scss']
})
export class PrintReturPembelianComponent implements OnInit {

    Data: any;

    GridProps: PrintOutGridModel.IGrid;

    Date = new Date();

    UserData: any = this._authenticationService.userData;

    @HostListener('window:afterprint', ['$event'])
    onAfterPrint(event: Event) {
        // window.history.back();
    }

    constructor(
        public _utilityService: UtilityService,
        private _activatedRoute: ActivatedRoute,
        private _setupSupplierService: SetupSupplierService,
        private _returPembelianService: ReturPembelianService,
        private _authenticationService: AuthenticationService,
    ) {
        this.GridProps = {
            id: 'print-out-retur-pembelian',
            column: [
                { field: 'urut', headerName: 'No.', },
                { field: 'kode_barang', headerName: 'Kode Barang', },
                { field: 'nama_barang', headerName: 'Nama Barang', },
                { field: 'qty', headerName: 'Qty', class: 'text-end', format: 'number' },
                { field: 'harga_satuan', headerName: 'Jumlah', class: 'text-end', format: 'currency' },
                { field: 'sub_total', headerName: 'Total', class: 'text-end', format: 'currency' },
            ],
            dataSource: [],
            height: "100%",
            showPaging: false,
        };
    }

    ngOnInit(): void {
        console.log("user data =>", this.UserData)

        const id = this._activatedRoute.snapshot.params['id'];
        this.getPemesananPo(id);
    }

    getPemesananPo(id: any) {
        this._returPembelianService
            .getById(id)
            .subscribe((result) => {
                this.Data = result.data;
                this.GridProps.dataSource = result.data.detail;

                let total_harga_satuan = 0;

                result.data.detail.forEach((item: any) => {
                    item.harga_satuan = parseInt(item.harga_satuan);
                    total_harga_satuan += item.harga_satuan;
                });

                this.Data.total_harga_satuan = total_harga_satuan;

                this.getDetailSupplier(this.Data.id_supplier);
            })
    }

    private getDetailSupplier(id_supplier: number) {
        this._setupSupplierService
            .getByIdSupplier(id_supplier)
            .subscribe((result) => {
                if (result.success) {
                    this.Data.alamat = result.data.alamat;
                    this.Data.no_handphone = result.data.no_handphone;

                    console.log("data =>", this.Data)

                    // setTimeout(() => {
                    //     window.print();
                    // }, 1500);
                }
            })
    }
}
