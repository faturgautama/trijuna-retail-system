import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { ReturKonsinyasiModel } from "src/app/@shared/models/pembelian/retur-konsinyasi.model";

export namespace ReturKonsinyasiAction {
    export class GetAll {
        static readonly type = '[RETUR KONSINYASI] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[RETUR KONSINYASI] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[RETUR KONSINYASI] Save';
        constructor(public payload: ReturKonsinyasiModel.SaveReturKonsinyasi) { }
    }

    export class Validasi {
        static readonly type = '[RETUR KONSINYASI] Validasi';
        constructor(public payload: number) { }
    }
}