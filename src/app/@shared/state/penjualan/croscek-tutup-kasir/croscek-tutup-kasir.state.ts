import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { PenjualanAction } from "./croscek-tutup-kasir.action";
import { PenjualanService } from "src/app/@core/service/penjualan/penjualan/penjualan.service";

export interface PenjualanStateModel {
    entities: any[] | [];
}

@State<PenjualanStateModel>({
    name: 'penjualan',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class PenjualanState {

    constructor(
        private _penjualanService: PenjualanService,
    ) { }

    @Selector()
    static allPenjualan(state: PenjualanStateModel) {
        return state.entities;
    }

    @Action(PenjualanAction.GetAll)
    getAllHistoryPenjualan(ctx: StateContext<PenjualanStateModel>, action: any) {
        return this._penjualanService.getAll(action.payload)
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

    @Action(PenjualanAction.GetById)
    getByIdHistoryPenjualan(ctx: StateContext<PenjualanStateModel>, action: any) {
        return this._penjualanService.getById(action.payload)
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