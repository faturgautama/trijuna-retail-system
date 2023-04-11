import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { SetupSupplierModel } from "src/app/@shared/models/setup-data/setup-supplier.model";

export namespace SetupSupplierAction {
    export class GetAll {
        static readonly type = '[SETUP SUPPLIER] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[SETUP SUPPLIER] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP SUPPLIER] Save';
        constructor(public payload: SetupSupplierModel.SaveSupplier) { }
    }

    export class Update {
        static readonly type = '[SETUP SUPPLIER] Update';
        constructor(public payload: SetupSupplierModel.UpdateSupplier) { }
    }

    export class Delete {
        static readonly type = '[SETUP SUPPLIER] Delete';
        constructor(public payload: number) { }
    }
}