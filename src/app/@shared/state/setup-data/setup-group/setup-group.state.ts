import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupGroupService } from "src/app/@core/service/setup-data/setup-group/setup-group.service";
import { SetupGroupModel } from "src/app/@shared/models/setup-data/setup-group.model";
import { SetupGroupAction } from "./setup-group.action";

export interface SetupGroupStateModel {
    entities: SetupGroupModel.ISetupGroup[] | [];
}

@State<SetupGroupStateModel>({
    name: 'setup_group',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupGroupState {

    constructor(
        private _setupGroupService: SetupGroupService,
    ) { }

    @Selector()
    static allSetupGroup(state: SetupGroupStateModel) {
        return state.entities;
    }

    @Action(SetupGroupAction.GetAll)
    getGroup(ctx: StateContext<SetupGroupStateModel>) {
        return this._setupGroupService.getAllGroup()
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

    @Action(SetupGroupAction.GetById)
    getByIdGroup(ctx: StateContext<SetupGroupStateModel>, action: any) {
        return this._setupGroupService.getById(action.payload)
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

    @Action(SetupGroupAction.Save)
    saveGroup(ctx: StateContext<SetupGroupStateModel>, action: any) {
        return this._setupGroupService.saveGroup(action.payload)
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

    @Action(SetupGroupAction.Update)
    updateGroup(ctx: StateContext<SetupGroupStateModel>, action: any) {
        return this._setupGroupService.updateGroup(action.payload)
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

    @Action(SetupGroupAction.Delete)
    deleteGroup(ctx: StateContext<SetupGroupStateModel>, action: any) {
        return this._setupGroupService.deleteGroup(action.payload)
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