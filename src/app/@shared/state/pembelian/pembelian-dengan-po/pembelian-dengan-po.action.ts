import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PembelianDenganPoModel } from "src/app/@shared/models/pembelian/pembelian-dengan-po.model";

export namespace PembelianDenganPoAction {
    export class GetAll {
        static readonly type = '[PEMBELIAN DENGAN PO] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[PEMBELIAN DENGAN PO] Get By Id';
        constructor(public payload: number) { }
    }

    export class GetDetailPemesanan {
        static readonly type = '[PEMBELIAN DENGAN PO] Get Detail Pemesanan';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[PEMBELIAN DENGAN PO] Save';
        constructor(public payload: PembelianDenganPoModel.SavePembelianDenganPo) { }
    }

    export class Validasi {
        static readonly type = '[PEMBELIAN DENGAN PO] Validasi';
        constructor(public payload: number) { }
    }
}