import { Component, EventEmitter, Output } from '@angular/core';
import { SetupBarangService } from 'src/app/@core/service/setup-data/setup-barang/setup-barang.service';

@Component({
    selector: 'app-edit-satuan-pembelian',
    templateUrl: './edit-satuan-pembelian.component.html',
    styleUrls: ['./edit-satuan-pembelian.component.scss']
})
export class EditSatuanPembelianComponent {

    ToggleModal = false;

    SatuanDatasource: any[] = [];

    SelectedSatuan: any;

    @Output('onSave') onSave = new EventEmitter<any>();

    constructor(
        private _setupBarangService: SetupBarangService
    ) { }

    handleOpenModal(satuans: string) {
        this.ToggleModal = true;
        this.SatuanDatasource = JSON.parse(satuans);
    }

    handleUpdateSatuan() {
        this.ToggleModal = false;
        this.onSave.emit(this.SelectedSatuan);
    }
}
