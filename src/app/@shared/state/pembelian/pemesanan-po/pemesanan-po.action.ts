import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PemesananPoModel } from "src/app/@shared/models/pembelian/pemesanan-po.model";

export namespace PemesananPoAction {
    export class GetAll {
        static readonly type = '[PEMESANAN PO] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[PEMESANAN PO] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[PEMESANAN PO] Save';
        constructor(public payload: PemesananPoModel.SavePemesananPo) { }
    }

    export class GetCountStatusOpen {
        static readonly type = '[PEMESANAN PO] Get Count Status Open';
    }
}