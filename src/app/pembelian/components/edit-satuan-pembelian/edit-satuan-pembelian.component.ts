import { Component } from '@angular/core';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';

@Component({
    selector: 'app-edit-satuan-pembelian',
    templateUrl: './edit-satuan-pembelian.component.html',
    styleUrls: ['./edit-satuan-pembelian.component.scss']
})
export class EditSatuanPembelianComponent {

    ToggleModal = false;

    SatuanDatasource: any[] = [];

    constructor(
        private _setupBarangService: SetupBarangService
    ) { }

    handleOpenModal(id_barang: number) {
        this.ToggleModal = true;
        this.getBarangSatuan(id_barang);
    }

    private getBarangSatuan(id_barang: number) {
        this._setupBarangService
            .getAllBarangSatuan(id_barang)
            .subscribe((result) => {
                console.log(result);
            })
    }
}
