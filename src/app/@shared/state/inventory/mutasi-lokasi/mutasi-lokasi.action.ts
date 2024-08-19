import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PembelianDenganPoModel } from "src/app/@shared/models/pembelian/pembelian-dengan-po.model";

export namespace MutasiLokasiAction {
    export class GetAll {
        static readonly type = '[MUTASI LOKASI] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[MUTASI LOKASI] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[MUTASI LOKASI] Save';
        constructor(public payload: any) { }
    }

    export class Validasi {
        static readonly type = '[MUTASI LOKASI] Validasi';
        constructor(public payload: number) { }
    }

    export class GetCountStatusOpen {
        static readonly type = '[MUTASI LOKASI] Get Count Status Open';
    }
}