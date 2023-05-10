import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { SetupGroupModel } from 'src/app/@shared/models/setup-data/setup-group.model';
import { SetupBarangAction } from 'src/app/@shared/state/setup-data/setup-barang';

@Component({
    selector: 'app-list-barang',
    templateUrl: './list-barang.component.html',
    styleUrls: ['./list-barang.component.scss']
})
export class ListBarangComponent implements OnInit {

    Barang: SetupBarangModel.ISetupBarang[] = [];

    @Output('selectCard') selectCard = new EventEmitter<SetupBarangModel.ISetupBarang>();

    constructor(
        private _store: Store
    ) { }

    ngOnInit(): void {
        this.getAllBarang([]);
    }

    getAllBarang(payload: FilterModel.IDynamicFilter[]): void {
        this._store.dispatch(new SetupBarangAction.GetAllBarang(payload))
            .pipe(
                map((result) => {
                    if (result.setup_barang.entities.success) {
                        return result.setup_barang.entities.data;
                    } else {
                        return [];
                    }
                })
            )
            .subscribe((result) => {
                this.Barang = result;
            })
    }

    handleClickFilterGroup(args: SetupGroupModel.ISetupGroup): void {
        const payload: FilterModel.IDynamicFilter = {
            column: "mg.group",
            filter: "equel",
            value: args.group,
            value2: ""
        };

        if (args.id_group == 0) {
            this.getAllBarang([]);
        } else {
            this.getAllBarang([payload]);
        }
    }

    handleSearchByBarcode(barcode: string): void {
        let payload: FilterModel.IDynamicFilter[] = [];

        if (barcode.length) {
            payload.push({
                column: "mb.barcode",
                filter: "contain",
                value: barcode,
                value2: ""
            });
        } else {
            payload = [];
        }

        this.getAllBarang(payload);
    }

    handleClickCardBarang(args: SetupBarangModel.ISetupBarang): void {
        this.selectCard.emit(args);
    }
}
