import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { PembelianDenganPoService } from "src/app/@core/service/pembelian/pembelian-dengan-po/pembelian-dengan-po.service";
import { PembelianDenganPoModel } from "src/app/@shared/models/pembelian/pembelian-dengan-po.model";
import { PembelianDenganPoAction } from "./pembelian-dengan-po.action";

export interface PembelianDenganPoStateModel {
    entities: PembelianDenganPoModel.IPembelianDenganPo[] | [];
}

@State<PembelianDenganPoStateModel>({
    name: 'pembelian_dengan_po',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class PembelianDenganPoState {

    constructor(
        private _pembelianDenganPoService: PembelianDenganPoService,
    ) { }

    @Selector()
    static allPembelianDenganPo(state: PembelianDenganPoStateModel) {
        return state.entities;
    }

    @Action(PembelianDenganPoAction.GetAll)
    getPemesananPo(ctx: StateContext<PembelianDenganPoStateModel>, action: any) {
        return this._pembelianDenganPoService.getAll(action.payload)
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

    @Action(PembelianDenganPoAction.GetById)
    getByIdPemesananPo(ctx: StateContext<PembelianDenganPoStateModel>, action: any) {
        return this._pembelianDenganPoService.getById(action.payload)
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

    @Action(PembelianDenganPoAction.GetDetailPemesanan)
    getDetailPemesanan(ctx: StateContext<PembelianDenganPoStateModel>, action: any) {
        return this._pembelianDenganPoService.getDetailPemesanan(action.payload)
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

    @Action(PembelianDenganPoAction.Save)
    savePemesananPo(ctx: StateContext<PembelianDenganPoStateModel>, action: any) {
        return this._pembelianDenganPoService.save(action.payload)
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

    @Action(PembelianDenganPoAction.Validasi)
    validasiPemesananPo(ctx: StateContext<PembelianDenganPoStateModel>, action: any) {
        return this._pembelianDenganPoService.validasi(action.payload)
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

    @Action(PembelianDenganPoAction.GetCountStatusOpen)
    getCountStatusOpen(ctx: StateContext<PembelianDenganPoStateModel>) {
        return this._pembelianDenganPoService.getCountStatusOpen()
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