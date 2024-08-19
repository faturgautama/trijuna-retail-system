import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { MutasiLokasiService } from "src/app/@core/service/inventory/mutasi-lokasi/mutasi-lokasi.service";
import { MutasiLokasiModel } from "src/app/@shared/models/inventory/mutasi-lokasi.model";
import { MutasiLokasiAction } from "./mutasi-lokasi.action";

export interface MutasiLokasiStateModel {
    entities: MutasiLokasiModel.IMutasiLokasi[] | [];
}

@State<MutasiLokasiStateModel>({
    name: 'mutasi_lokasi',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class MutasiLokasiState {

    constructor(
        private _mutasiLokasiService: MutasiLokasiService,
    ) { }

    @Selector()
    static allMutasiWarehouse(state: MutasiLokasiStateModel) {
        return state.entities;
    }

    @Action(MutasiLokasiAction.GetAll)
    getMutasiWarehouse(ctx: StateContext<MutasiLokasiStateModel>, action: any) {
        return this._mutasiLokasiService.getAll(action.payload)
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

    @Action(MutasiLokasiAction.GetById)
    getByIdMutasiWarehouse(ctx: StateContext<MutasiLokasiStateModel>, action: any) {
        return this._mutasiLokasiService.getById(action.payload)
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

    @Action(MutasiLokasiAction.Save)
    saveMutasiWarehouse(ctx: StateContext<MutasiLokasiStateModel>, action: any) {
        return this._mutasiLokasiService.save(action.payload)
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

    @Action(MutasiLokasiAction.Validasi)
    validasiMutasiWarehouse(ctx: StateContext<MutasiLokasiStateModel>, action: any) {
        return this._mutasiLokasiService.validasi({ id_mutasi_lokasi: action.payload })
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

    @Action(MutasiLokasiAction.GetCountStatusOpen)
    getCountStatusOpen(ctx: StateContext<MutasiLokasiStateModel>) {
        return this._mutasiLokasiService.getCountStatusOpen()
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