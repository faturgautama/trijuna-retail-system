import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupDivisiService } from "src/app/@core/service/setup-data/setup-divisi/setup-divisi.service";
import { SetupDivisiModel } from "src/app/@shared/models/setup-data/setup-divisi.model";
import { SetupDivisiAction } from "./setup-divisi.action";

export interface SetupDivisiStateModel {
    entities: SetupDivisiModel.ISetupDivisi[] | [];
}

@State<SetupDivisiStateModel>({
    name: 'setup_divisi',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupDivisiState {

    constructor(
        private _setupDivisiService: SetupDivisiService,
    ) { }

    @Selector()
    static allSetupDivisi(state: SetupDivisiStateModel) {
        return state.entities;
    }

    @Action(SetupDivisiAction.GetAll)
    getDivisi(ctx: StateContext<SetupDivisiStateModel>) {
        return this._setupDivisiService.getAllDivisi()
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

    @Action(SetupDivisiAction.GetById)
    getByIdDivisi(ctx: StateContext<SetupDivisiStateModel>, action: any) {
        return this._setupDivisiService.getById(action.payload)
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

    @Action(SetupDivisiAction.Save)
    saveDivisi(ctx: StateContext<SetupDivisiStateModel>, action: any) {
        return this._setupDivisiService.saveDivisi(action.payload)
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

    @Action(SetupDivisiAction.Update)
    updateDivisi(ctx: StateContext<SetupDivisiStateModel>, action: any) {
        return this._setupDivisiService.updateDivisi(action.payload)
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

    @Action(SetupDivisiAction.Delete)
    deleteDivisi(ctx: StateContext<SetupDivisiStateModel>, action: any) {
        return this._setupDivisiService.deleteDivisi(action.payload)
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