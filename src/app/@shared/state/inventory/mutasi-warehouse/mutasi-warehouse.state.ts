import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MutasiWarehouseService } from "src/app/@core/service/inventory/mutasi-warehouse/mutasi-warehouse.service";
import { MutasiWarehouseModel } from "src/app/@shared/models/inventory/mutasi-warehouse.model";
import { MutasiWarehouseAction } from "./mutasi-warehouse.action";
import { tap } from "rxjs";

export interface MutasiWarehouseStateModel {
    entities: MutasiWarehouseModel.IMutasiWarehouse[] | [];
}

@State<MutasiWarehouseStateModel>({
    name: 'mutasi_warehouse',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class MutasiWarehouseState {

    constructor(
        private _mutasiWarehouseService: MutasiWarehouseService,
    ) { }

    @Selector()
    static allMutasiWarehouse(state: MutasiWarehouseStateModel) {
        return state.entities;
    }

    @Action(MutasiWarehouseAction.GetAll)
    getMutasiWarehouse(ctx: StateContext<MutasiWarehouseStateModel>, action: any) {
        return this._mutasiWarehouseService.getAll(action.payload)
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

    @Action(MutasiWarehouseAction.GetById)
    getByIdMutasiWarehouse(ctx: StateContext<MutasiWarehouseStateModel>, action: any) {
        return this._mutasiWarehouseService.getById(action.payload)
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

    @Action(MutasiWarehouseAction.Save)
    saveMutasiWarehouse(ctx: StateContext<MutasiWarehouseStateModel>, action: any) {
        return this._mutasiWarehouseService.save(action.payload)
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

    @Action(MutasiWarehouseAction.Validasi)
    validasiMutasiWarehouse(ctx: StateContext<MutasiWarehouseStateModel>, action: any) {
        return this._mutasiWarehouseService.validasi(action.payload)
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

    @Action(MutasiWarehouseAction.GetCountStatusOpen)
    getCountStatusOpen(ctx: StateContext<MutasiWarehouseStateModel>) {
        return this._mutasiWarehouseService.getCountStatusOpen()
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