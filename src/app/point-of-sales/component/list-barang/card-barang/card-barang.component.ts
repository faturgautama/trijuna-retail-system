import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';

@Component({
    selector: 'app-card-barang',
    templateUrl: './card-barang.component.html',
    styleUrls: ['./card-barang.component.scss']
})
export class CardBarangComponent {

    @Input('props') props: SetupBarangModel.ISetupBarang = {} as any;

    @Output('onClick') onClick = new EventEmitter<SetupBarangModel.ISetupBarang>()

    handleClick(args: SetupBarangModel.ISetupBarang): void {
        this.onClick.emit(args);
    }
}
