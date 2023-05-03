import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { ReturKonsinyasiService } from "src/app/@core/service/pembelian/retur-konsinyasi/retur-konsinyasi.service";
import { ReturKonsinyasiAction } from "./retur-konsinyasi.action";
import { ReturKonsinyasiModel } from "src/app/@shared/models/pembelian/retur-konsinyasi.model";

export interface ReturKonsinyasiStateModel {
    entities: ReturKonsinyasiModel.IReturKonsinyasi[] | [];
}

@State<ReturKonsinyasiStateModel>({
    name: 'retur_konsinyasi',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class ReturKonsinyasiState {

    constructor(
        private _returKonsinyasiService: ReturKonsinyasiService,
    ) { }

    @Selector()
    static allReturKonsinyasi(state: ReturKonsinyasiStateModel) {
        return state.entities;
    }

    @Action(ReturKonsinyasiAction.GetAll)
    getAll(ctx: StateContext<ReturKonsinyasiStateModel>, action: any) {
        return this._returKonsinyasiService.getAll(action.payload)
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

    @Action(ReturKonsinyasiAction.GetById)
    getById(ctx: StateContext<ReturKonsinyasiStateModel>, action: any) {
        return this._returKonsinyasiService.getById(action.payload)
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

    @Action(ReturKonsinyasiAction.Save)
    save(ctx: StateContext<ReturKonsinyasiStateModel>, action: any) {
        return this._returKonsinyasiService.save(action.payload)
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

    @Action(ReturKonsinyasiAction.Validasi)
    validasi(ctx: StateContext<ReturKonsinyasiStateModel>, action: any) {
        return this._returKonsinyasiService.validasi(action.payload)
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