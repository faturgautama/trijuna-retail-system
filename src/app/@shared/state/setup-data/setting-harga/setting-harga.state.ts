import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SettingHargaService } from "src/app/@core/service/setup-data/setting-harga/setting-harga.service";
import { SettingHargaModel } from "src/app/@shared/models/setup-data/setting-harga.model";
import { SettingHargaAction } from "./setting-harga.action";
import { tap } from "rxjs";
import { FilterModel } from "src/app/@shared/models/components/filter.model";

export interface SettingHargaStateModel {
    entities: SettingHargaModel.ISettingHarga[] | [];
}

@State<SettingHargaStateModel>({
    name: 'setting_harga',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SettingHargaState {

    constructor(
        private _settingHargaService: SettingHargaService,
    ) { }

    @Selector()
    static allSettingHarga(state: SettingHargaStateModel) {
        return state.entities;
    }

    @Action(SettingHargaAction.GetAll)
    getSettingHarga(ctx: StateContext<SettingHargaStateModel>, action: any) {
        return this._settingHargaService.getAll(action.payload)
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

    @Action(SettingHargaAction.GetById)
    getByIdSettingHarga(ctx: StateContext<SettingHargaStateModel>, action: any) {
        return this._settingHargaService.getById(action.payload)
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

    @Action(SettingHargaAction.Save)
    saveSettingHarga(ctx: StateContext<SettingHargaStateModel>, action: any) {
        return this._settingHargaService.save(action.payload)
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