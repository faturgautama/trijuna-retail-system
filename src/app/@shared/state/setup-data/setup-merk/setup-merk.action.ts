import { SetupMerkModel } from "src/app/@shared/models/setup-data/setup-merk.model";

export namespace SetupMerkAction {
    export class GetAll {
        static readonly type = '[SETUP MERK] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP MERK] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP MERK] Save';
        constructor(public payload: SetupMerkModel.SaveSetupMerk) { }
    }

    export class Update {
        static readonly type = '[SETUP MERK] Update';
        constructor(public payload: SetupMerkModel.UpdateSetupMerk) { }
    }

    export class Delete {
        static readonly type = '[SETUP MERK] Delete';
        constructor(public payload: number) { }
    }
}