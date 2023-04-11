import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupMerkService } from "src/app/@core/service/setup-data/setup-merk/setup-merk.service";
import { SetupMerkModel } from "src/app/@shared/models/setup-data/setup-merk.model";
import { SetupMerkAction } from "./setup-merk.action";

export interface SetupMerkStateModel {
    entities: SetupMerkModel.ISetupMerk[] | [];
}

@State<SetupMerkStateModel>({
    name: 'setup_merk',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupMerkState {

    constructor(
        private _setupMerkService: SetupMerkService,
    ) { }

    @Selector()
    static allSetupMerk(state: SetupMerkStateModel) {
        return state.entities;
    }

    @Action(SetupMerkAction.GetAll)
    getMerk(ctx: StateContext<SetupMerkStateModel>) {
        return this._setupMerkService.getAllMerk()
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

    @Action(SetupMerkAction.GetById)
    getByIdMerk(ctx: StateContext<SetupMerkStateModel>, action: any) {
        return this._setupMerkService.getById(action.payload)
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

    @Action(SetupMerkAction.Save)
    saveMerk(ctx: StateContext<SetupMerkStateModel>, action: any) {
        return this._setupMerkService.saveMerk(action.payload)
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

    @Action(SetupMerkAction.Update)
    updateMerk(ctx: StateContext<SetupMerkStateModel>, action: any) {
        return this._setupMerkService.updateMerk(action.payload)
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

    @Action(SetupMerkAction.Delete)
    deleteMerk(ctx: StateContext<SetupMerkStateModel>, action: any) {
        return this._setupMerkService.deleteMerk(action.payload)
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