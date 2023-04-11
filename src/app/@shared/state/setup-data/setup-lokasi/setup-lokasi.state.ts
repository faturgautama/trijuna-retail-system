import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupLokasiService } from "src/app/@core/service/setup-data/setup-lokasi/setup-lokasi.service";
import { SetupLokasiModel } from "src/app/@shared/models/setup-data/setup-lokasi.model";
import { SetupLokasiAction } from "./setup-lokasi.action";

export interface SetupLokasiStateModel {
    entities: SetupLokasiModel.ISetupLokasi[] | [];
}

@State<SetupLokasiStateModel>({
    name: 'setup_lokasi',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupLokasiState {

    constructor(
        private _setupLokasiService: SetupLokasiService,
    ) { }

    @Selector()
    static allSetupLokasi(state: SetupLokasiStateModel) {
        return state.entities;
    }

    @Action(SetupLokasiAction.GetAll)
    getLokasi(ctx: StateContext<SetupLokasiStateModel>) {
        return this._setupLokasiService.getAllLokasi()
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

    @Action(SetupLokasiAction.GetById)
    getByIdLokasi(ctx: StateContext<SetupLokasiStateModel>, action: any) {
        return this._setupLokasiService.getById(action.payload)
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

    @Action(SetupLokasiAction.Save)
    saveLokasi(ctx: StateContext<SetupLokasiStateModel>, action: any) {
        return this._setupLokasiService.saveLokasi(action.payload)
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

    @Action(SetupLokasiAction.Update)
    updateLokasi(ctx: StateContext<SetupLokasiStateModel>, action: any) {
        return this._setupLokasiService.updateLokasi(action.payload)
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

    @Action(SetupLokasiAction.Delete)
    deleteLokasi(ctx: StateContext<SetupLokasiStateModel>, action: any) {
        return this._setupLokasiService.deleteLokasi(action.payload)
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