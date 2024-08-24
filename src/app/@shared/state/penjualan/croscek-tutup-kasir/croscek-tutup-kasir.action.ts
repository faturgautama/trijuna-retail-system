import { FilterModel } from "src/app/@shared/models/components/filter.model";

export namespace PenjualanAction {
    export class GetAll {
        static readonly type = '[CROSCEK TUTUP KASIR] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[CROSCEK TUTUP KASIR] Get By Id';
        constructor(public payload: number) { }
    }
}