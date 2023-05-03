import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PembelianTanpaPoModel } from "src/app/@shared/models/pembelian/pembelian-tanpa-po.model";

export namespace PembelianTanpaPoAction {
    export class GetAll {
        static readonly type = '[PEMBELIAN TANPA PO] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[PEMBELIAN TANPA PO] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[PEMBELIAN TANPA PO] Save';
        constructor(public payload: PembelianTanpaPoModel.SavePembelianTanpaPo) { }
    }

    export class Validasi {
        static readonly type = '[PEMBELIAN TANPA PO] Validasi';
        constructor(public payload: number) { }
    }

    export class GetCountStatusOpen {
        static readonly type = '[PEMBELIAN TANPA PO] Get Count Status Open';
    }
}