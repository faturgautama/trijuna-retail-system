import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PenerimaanKonsinyasiModel } from "src/app/@shared/models/pembelian/penerimaan-konsinyasi.model";

export namespace PenerimaanKonsinyasiAction {
    export class GetAll {
        static readonly type = '[PENERIMAAN KONSINYASI] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[PENERIMAAN KONSINYASI] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[PENERIMAAN KONSINYASI] Save';
        constructor(public payload: PenerimaanKonsinyasiModel.SavePenerimaanKonsinyasi) { }
    }

    export class Validasi {
        static readonly type = '[PENERIMAAN KONSINYASI] Validasi';
        constructor(public payload: number) { }
    }
}