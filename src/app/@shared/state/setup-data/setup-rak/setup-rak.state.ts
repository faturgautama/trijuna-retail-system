import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupRakService } from "src/app/@core/service/setup-data/setup-rak/setup-rak.service";
import { SetupRakModel } from "src/app/@shared/models/setup-data/setup-rak.model";
import { SetupRakAction } from "./setup-rak.action";

export interface SetupRakStateModel {
    entities: SetupRakModel.ISetupRak[] | [];
}

@State<SetupRakStateModel>({
    name: 'setup_rak',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupRakState {

    constructor(
        private _setupRakService: SetupRakService,
    ) { }

    @Selector()
    static allSetupRak(state: SetupRakStateModel) {
        return state.entities;
    }

    @Action(SetupRakAction.GetAll)
    getRak(ctx: StateContext<SetupRakStateModel>) {
        return this._setupRakService.getAllRak()
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

    @Action(SetupRakAction.GetById)
    getByIdRak(ctx: StateContext<SetupRakStateModel>, action: any) {
        return this._setupRakService.getById(action.payload)
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

    @Action(SetupRakAction.Save)
    saveRak(ctx: StateContext<SetupRakStateModel>, action: any) {
        return this._setupRakService.saveRak(action.payload)
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

    @Action(SetupRakAction.Update)
    updateRak(ctx: StateContext<SetupRakStateModel>, action: any) {
        return this._setupRakService.updateRak(action.payload)
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

    @Action(SetupRakAction.Delete)
    deleteRak(ctx: StateContext<SetupRakStateModel>, action: any) {
        return this._setupRakService.deleteRak(action.payload)
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