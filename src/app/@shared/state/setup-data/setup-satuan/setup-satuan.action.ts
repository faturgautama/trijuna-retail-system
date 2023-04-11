import { SetupSatuanModel } from "src/app/@shared/models/setup-data/setup-satuan.model";

export namespace SetupSatuanAction {
    export class GetAll {
        static readonly type = '[SETUP SATUAN] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP SATUAN] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP SATUAN] Save';
        constructor(public payload: SetupSatuanModel.SaveSetupSatuan) { }
    }

    export class Update {
        static readonly type = '[SETUP SATUAN] Update';
        constructor(public payload: SetupSatuanModel.UpdateSetupSatuan) { }
    }

    export class Delete {
        static readonly type = '[SETUP SATUAN] Delete';
        constructor(public payload: number) { }
    }
}