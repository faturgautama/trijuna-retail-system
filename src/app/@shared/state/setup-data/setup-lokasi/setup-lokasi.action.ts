import { SetupLokasiModel } from "src/app/@shared/models/setup-data/setup-lokasi.model";

export namespace SetupLokasiAction {
    export class GetAll {
        static readonly type = '[SETUP LOKASI] Get All';
    }

    export class GetById {
        static readonly type = '[SETUP LOKASI] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP LOKASI] Save';
        constructor(public payload: SetupLokasiModel.SaveSetupLokasi) { }
    }

    export class Update {
        static readonly type = '[SETUP LOKASI] Update';
        constructor(public payload: SetupLokasiModel.UpdateSetupLokasi) { }
    }

    export class Delete {
        static readonly type = '[SETUP LOKASI] Delete';
        constructor(public payload: number) { }
    }
}