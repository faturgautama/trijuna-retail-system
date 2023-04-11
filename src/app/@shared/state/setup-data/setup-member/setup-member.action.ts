import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { SetupMemberModel } from "src/app/@shared/models/setup-data/setup-member.model";

export namespace SetupMemberAction {
    export class GetAll {
        static readonly type = '[SETUP MEMBER] Get All';
        constructor(public payload: FilterModel.IDynamicFilter[]) { }
    }

    export class GetById {
        static readonly type = '[SETUP MEMBER] Get By Id';
        constructor(public payload: number) { }
    }

    export class Save {
        static readonly type = '[SETUP MEMBER] Save';
        constructor(public payload: SetupMemberModel.SaveMember) { }
    }

    export class Update {
        static readonly type = '[SETUP MEMBER] Update';
        constructor(public payload: SetupMemberModel.UpdateMember) { }
    }

    export class Delete {
        static readonly type = '[SETUP MEMBER] Delete';
        constructor(public payload: number) { }
    }
}