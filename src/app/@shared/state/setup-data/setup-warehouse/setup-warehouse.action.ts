import { SetupWarehouseModel } from "src/app/@shared/models/setup-data/setup-warehouse.model";

export namespace SetupWarehouseAction {
    export class GetAll {
        static readonly type = '[SETUP WAREHOUSE] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP WAREHOUSE] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP WAREHOUSE] Save';
        constructor(public payload: SetupWarehouseModel.SaveSetupWarehouse) { }
    }

    export class Update {
        static readonly type = '[SETUP WAREHOUSE] Update';
        constructor(public payload: SetupWarehouseModel.UpdateSetupWarehouse) { }
    }

    export class Delete {
        static readonly type = '[SETUP WAREHOUSE] Delete';
        constructor(public payload: number) { }
    }
}