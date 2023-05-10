import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { SetupGroupModel } from 'src/app/@shared/models/setup-data/setup-group.model';
import { SetupGroupAction } from 'src/app/@shared/state/setup-data/setup-group';

@Component({
    selector: 'app-filter-group',
    templateUrl: './filter-group.component.html',
    styleUrls: ['./filter-group.component.scss']
})
export class FilterGroupComponent implements OnInit {

    Group: SetupGroupModel.ISetupGroup[] = [];

    @Output('onClick') onClick = new EventEmitter<SetupGroupModel.ISetupGroup>();

    constructor(
        private _store: Store,
    ) { }

    ngOnInit(): void {
        this._store.dispatch(new SetupGroupAction.GetAll())
            .pipe(
                map((result) => {
                    return result.setup_group.entities.data;
                })
            )
            .subscribe((result) => {
                this.Group = [
                    {
                        "id_group": 0,
                        "kode_group": "0000",
                        "group": "Semua",
                        "is_active": true,
                        "created_by": 1,
                        "updated_by": 1,
                        "created_at": "2023-04-18T06:47:31.000000Z",
                        "updated_at": "2023-04-18T06:47:31.000000Z"
                    }, ...result];
            })
    }

    handleClickGroup(data: SetupGroupModel.ISetupGroup): void {
        this.onClick.emit(data);
    }
}
