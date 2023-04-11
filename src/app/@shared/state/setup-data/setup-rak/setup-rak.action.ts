import { SetupRakModel } from "src/app/@shared/models/setup-data/setup-rak.model";

export namespace SetupRakAction {
    export class GetAll {
        static readonly type = '[SETUP RAK] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP RAK] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP RAK] Save';
        constructor(public payload: SetupRakModel.SaveSetupRak) { }
    }

    export class Update {
        static readonly type = '[SETUP RAK] Update';
        constructor(public payload: SetupRakModel.UpdateSetupRak) { }
    }

    export class Delete {
        static readonly type = '[SETUP RAK] Delete';
        constructor(public payload: number) { }
    }
}