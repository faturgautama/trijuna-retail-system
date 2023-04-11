import { SetupDivisiModel } from "src/app/@shared/models/setup-data/setup-divisi.model";

export namespace SetupDivisiAction {
    export class GetAll {
        static readonly type = '[SETUP DIVISI] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP DIVISI] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP DIVISI] Save';
        constructor(public payload: SetupDivisiModel.SaveSetupDivisi) { }
    }

    export class Update {
        static readonly type = '[SETUP DIVISI] Update';
        constructor(public payload: SetupDivisiModel.UpdateSetupDivisi) { }
    }

    export class Delete {
        static readonly type = '[SETUP DIVISI] Delete';
        constructor(public payload: number) { }
    }
}