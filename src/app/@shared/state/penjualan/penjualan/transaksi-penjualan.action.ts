import { FilterModel } from "src/app/@shared/models/components/filter.model";

export namespace PenjualanAction {
    export class GetAll {
        static readonly type = '[PENJUALAN] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[PENJUALAN] Get By Id';
        constructor(public payload: number) { }
    }
}