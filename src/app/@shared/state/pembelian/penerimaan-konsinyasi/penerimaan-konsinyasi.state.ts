import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { PenerimaanKonsinyasiService } from "src/app/@core/service/pembelian/penerimaan-konsinyasi/penerimaan-konsinyasi.service";
import { PenerimaanKonsinyasiModel } from "src/app/@shared/models/pembelian/penerimaan-konsinyasi.model";
import { PenerimaanKonsinyasiAction } from "./penerimaan-konsinyasi.action";

export interface PenerimaanKonsinyasiStateModel {
    entities: PenerimaanKonsinyasiModel.IPenerimaanKonsinyasi[] | [];
}

@State<PenerimaanKonsinyasiStateModel>({
    name: 'penerimaan_konsinyasi',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class PenerimaanKonsinyasiState {

    constructor(
        private _penerimaanKonsinyasiService: PenerimaanKonsinyasiService,
    ) { }

    @Selector()
    static allPenerimaanKonsinyasi(state: PenerimaanKonsinyasiStateModel) {
        return state.entities;
    }

    @Action(PenerimaanKonsinyasiAction.GetAll)
    getAll(ctx: StateContext<PenerimaanKonsinyasiStateModel>, action: any) {
        return this._penerimaanKonsinyasiService.getAll(action.payload)
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

    @Action(PenerimaanKonsinyasiAction.GetById)
    getById(ctx: StateContext<PenerimaanKonsinyasiStateModel>, action: any) {
        return this._penerimaanKonsinyasiService.getById(action.payload)
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

    @Action(PenerimaanKonsinyasiAction.Save)
    save(ctx: StateContext<PenerimaanKonsinyasiStateModel>, action: any) {
        return this._penerimaanKonsinyasiService.save(action.payload)
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

    @Action(PenerimaanKonsinyasiAction.Validasi)
    validasi(ctx: StateContext<PenerimaanKonsinyasiStateModel>, action: any) {
        return this._penerimaanKonsinyasiService.validasi(action.payload)
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