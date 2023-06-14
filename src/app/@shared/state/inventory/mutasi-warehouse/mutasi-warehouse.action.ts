import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PembelianDenganPoModel } from "src/app/@shared/models/pembelian/pembelian-dengan-po.model";

export namespace MutasiWarehouseAction {
    export class GetAll {
        static readonly type = '[MUTASI WAREHOUSE] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[MUTASI WAREHOUSE] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[MUTASI WAREHOUSE] Save';
        constructor(public payload: PembelianDenganPoModel.SavePembelianDenganPo) { }
    }

    export class Validasi {
        static readonly type = '[MUTASI WAREHOUSE] Validasi';
        constructor(public payload: number) { }
    }

    export class GetCountStatusOpen {
        static readonly type = '[MUTASI WAREHOUSE] Get Count Status Open';
    }
}