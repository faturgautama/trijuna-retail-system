import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetupMemberService } from "src/app/@core/service/setup-data/setup-member/setup-member.service";
import { SetupMemberModel } from "src/app/@shared/models/setup-data/setup-member.model";
import { SetupMemberAction } from "./setup-member.action";
import { tap } from "rxjs";

export interface SetupMemberStateModel {
    entities: SetupMemberModel.IMember[] | [];
}

@State<SetupMemberStateModel>({
    name: 'setup_member',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupMemberState {

    constructor(
        private _setupMemberService: SetupMemberService,
    ) { }

    @Selector()
    static allSetupMember(state: SetupMemberStateModel) {
        return state.entities;
    }

    @Action(SetupMemberAction.GetAll)
    getMember(ctx: StateContext<SetupMemberStateModel>, action: any) {
        return this._setupMemberService.getAllMember(action.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }

    @Action(SetupMemberAction.GetById)
    getByIdMember(ctx: StateContext<SetupMemberStateModel>, action: any) {
        return this._setupMemberService.getById(action.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }

    @Action(SetupMemberAction.Save)
    saveMember(ctx: StateContext<SetupMemberStateModel>, action: any) {
        return this._setupMemberService.saveMember(action.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }

    @Action(SetupMemberAction.Update)
    updateMember(ctx: StateContext<SetupMemberStateModel>, action: any) {
        return this._setupMemberService.updateMember(action.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }

    @Action(SetupMemberAction.Delete)
    deleteMember(ctx: StateContext<SetupMemberStateModel>, action: any) {
        return this._setupMemberService.deleteMember(action.payload)
            .pipe(
                tap((result) => {
                    const state = ctx.getState();

                    return ctx.setState({
                        ...state,
                        entities: result
                    })
                })
            )
    }
}