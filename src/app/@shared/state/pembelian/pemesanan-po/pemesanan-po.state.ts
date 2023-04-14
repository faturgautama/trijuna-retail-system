import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { PemesananPoService } from "src/app/@core/service/pembelian/pemesanan-po/pemesanan-po.service";
import { FilterModel } from "src/app/@shared/models/components/filter.model";
import { PemesananPoModel } from "src/app/@shared/models/pembelian/pemesanan-po.model";
import { PemesananPoAction } from "./pemesanan-po.action";

export interface PemesananPoStateModel {
    entities: PemesananPoModel.IPemesananPo[] | [];
}

@State<PemesananPoStateModel>({
    name: 'pemesanan_po',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class PemesananPoState {

    constructor(
        private _pemesananPoService: PemesananPoService,
    ) { }

    @Selector()
    static allPemesananPo(state: PemesananPoStateModel) {
        return state.entities;
    }

    @Action(PemesananPoAction.GetAll)
    getPemesananPo(ctx: StateContext<PemesananPoStateModel>, action: any) {
        return this._pemesananPoService.getAll(action.payload)
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

    @Action(PemesananPoAction.GetById)
    getByIdPemesananPo(ctx: StateContext<PemesananPoStateModel>, action: any) {
        return this._pemesananPoService.getById(action.payload)
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

    @Action(PemesananPoAction.Save)
    savePemesananPo(ctx: StateContext<PemesananPoStateModel>, action: any) {
        return this._pemesananPoService.save(action.payload)
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