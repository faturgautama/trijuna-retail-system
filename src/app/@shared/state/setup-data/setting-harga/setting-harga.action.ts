import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { SettingHargaModel } from "src/app/@shared/models/setup-data/setting-harga.model";

export namespace SettingHargaAction {
    export class GetAll {
        static readonly type = '[SETTING HARGA] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[SETTING HARGA] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETTING HARGA] Save';
        constructor(public payload: SettingHargaModel.SaveSettingHarga) { }
    }
}