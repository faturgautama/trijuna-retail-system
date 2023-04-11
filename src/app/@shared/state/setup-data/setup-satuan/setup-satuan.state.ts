import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupSatuanService } from "src/app/@core/service/setup-data/setup-satuan/setup-satuan.service";
import { SetupSatuanModel } from "src/app/@shared/models/setup-data/setup-satuan.model";
import { SetupSatuanAction } from "./setup-satuan.action";

export interface SetupSatuanStateModel {
    entities: SetupSatuanModel.ISetupSatuan[] | [];
}

@State<SetupSatuanStateModel>({
    name: 'setup_satuan',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupSatuanState {

    constructor(
        private _setupSatuanService: SetupSatuanService,
    ) { }

    @Selector()
    static allSetupSatuan(state: SetupSatuanStateModel) {
        return state.entities;
    }

    @Action(SetupSatuanAction.GetAll)
    getSatuan(ctx: StateContext<SetupSatuanStateModel>) {
        return this._setupSatuanService.getAllSatuan()
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

    @Action(SetupSatuanAction.GetById)
    getByIdSatuan(ctx: StateContext<SetupSatuanStateModel>, action: any) {
        return this._setupSatuanService.getById(action.payload)
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

    @Action(SetupSatuanAction.Save)
    saveSatuan(ctx: StateContext<SetupSatuanStateModel>, action: any) {
        return this._setupSatuanService.saveSatuan(action.payload)
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

    @Action(SetupSatuanAction.Update)
    updateSatuan(ctx: StateContext<SetupSatuanStateModel>, action: any) {
        return this._setupSatuanService.updateSatuan(action.payload)
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

    @Action(SetupSatuanAction.Delete)
    deleteSatuan(ctx: StateContext<SetupSatuanStateModel>, action: any) {
        return this._setupSatuanService.deleteSatuan(action.payload)
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