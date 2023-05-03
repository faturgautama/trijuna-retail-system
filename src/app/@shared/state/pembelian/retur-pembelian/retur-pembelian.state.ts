import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ReturPembelianService } from "src/app/@core/service/pembelian/retur-pembelian/retur-pembelian.service";
import { ReturPembelianModel } from "src/app/@shared/models/pembelian/retur-pembelian.model";
import { ReturPembelianAction } from "./retur-pembelian.action";

export interface ReturPembelianStateModel {
    entities: ReturPembelianModel.IReturPembelian[] | [];
}

@State<ReturPembelianStateModel>({
    name: 'retur_pembelian',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class ReturPembelianState {

    constructor(
        private _returPembelianService: ReturPembelianService,
    ) { }

    @Selector()
    static allReturPembelian(state: ReturPembelianStateModel) {
        return state.entities;
    }

    @Action(ReturPembelianAction.GetAll)
    getAll(ctx: StateContext<ReturPembelianStateModel>, action: any) {
        return this._returPembelianService.getAll(action.payload)
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

    @Action(ReturPembelianAction.GetById)
    getById(ctx: StateContext<ReturPembelianStateModel>, action: any) {
        return this._returPembelianService.getById(action.payload)
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

    @Action(ReturPembelianAction.Save)
    save(ctx: StateContext<ReturPembelianStateModel>, action: any) {
        return this._returPembelianService.save(action.payload)
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

    @Action(ReturPembelianAction.Validasi)
    validasi(ctx: StateContext<ReturPembelianStateModel>, action: any) {
        return this._returPembelianService.validasi(action.payload)
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