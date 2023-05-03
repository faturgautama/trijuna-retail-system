import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { ReturPembelianModel } from "src/app/@shared/models/pembelian/retur-pembelian.model";

export namespace ReturPembelianAction {
    export class GetAll {
        static readonly type = '[RETUR PEMBELIAN] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[RETUR PEMBELIAN] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[RETUR PEMBELIAN] Save';
        constructor(public payload: ReturPembelianModel.SaveReturPembelian) { }
    }

    export class Validasi {
        static readonly type = '[RETUR PEMBELIAN] Validasi';
        constructor(public payload: number) { }
    }
}