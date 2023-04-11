import { SetupDivisiModel } from "src/app/@shared/models/setup-data/setup-divisi.model";
import { SetupGroupModel } from "src/app/@shared/models/setup-data/setup-group.model";

export namespace SetupGroupAction {
    export class GetAll {
        static readonly type = '[SETUP GROUP] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP GROUP] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP GROUP] Save';
        constructor(public payload: SetupGroupModel.SaveSetupGroup) { }
    }

    export class Update {
        static readonly type = '[SETUP GROUP] Update';
        constructor(public payload: SetupGroupModel.UpdateSetupGroup) { }
    }

    export class Delete {
        static readonly type = '[SETUP GROUP] Delete';
        constructor(public payload: number) { }
    }
}