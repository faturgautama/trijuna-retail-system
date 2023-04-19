import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { PembelianTanpaPoService } from "src/app/@core/service/pembelian/pembelian-tanpa-po/pembelian-tanpa-po.service";
import { PembelianTanpaPoModel } from "src/app/@shared/models/pembelian/pembelian-tanpa-po.model";
import { PembelianTanpaPoAction } from "./pembelian-tanpa-po.action";

export interface PembelianTanpaPoStateModel {
    entities: PembelianTanpaPoModel.IPembelianTanpaPo[] | [];
}

@State<PembelianTanpaPoStateModel>({
    name: 'pembelian_tanpa_po',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class PembelianTanpaPoState {

    constructor(
        private _pembelianTanpaPoService: PembelianTanpaPoService,
    ) { }

    @Selector()
    static allPembelianTanpaPo(state: PembelianTanpaPoStateModel) {
        return state.entities;
    }

    @Action(PembelianTanpaPoAction.GetAll)
    getPemesananPo(ctx: StateContext<PembelianTanpaPoStateModel>, action: any) {
        return this._pembelianTanpaPoService.getAll(action.payload)
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

    @Action(PembelianTanpaPoAction.GetById)
    getByIdPemesananPo(ctx: StateContext<PembelianTanpaPoStateModel>, action: any) {
        return this._pembelianTanpaPoService.getById(action.payload)
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

    @Action(PembelianTanpaPoAction.Save)
    savePemesananPo(ctx: StateContext<PembelianTanpaPoStateModel>, action: any) {
        return this._pembelianTanpaPoService.save(action.payload)
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

    @Action(PembelianTanpaPoAction.Validasi)
    validasiPemesananPo(ctx: StateContext<PembelianTanpaPoStateModel>, action: any) {
        return this._pembelianTanpaPoService.validasi(action.payload)
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