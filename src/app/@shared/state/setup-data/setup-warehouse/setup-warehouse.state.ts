import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupWarehouseService } from "src/app/@core/service/setup-data/setup-warehouse/setup-warehouse.service";
import { SetupWarehouseModel } from "src/app/@shared/models/setup-data/setup-warehouse.model";
import { SetupWarehouseAction } from "./setup-warehouse.action";

export interface SetupWarehouseStateModel {
    entities: SetupWarehouseModel.ISetupWarehouse[] | [];
}

@State<SetupWarehouseStateModel>({
    name: 'setup_warehouse',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupWarehouseState {

    constructor(
        private _setupWarehouseService: SetupWarehouseService,
    ) { }

    @Selector()
    static allSetupWarehouse(state: SetupWarehouseStateModel) {
        return state.entities;
    }

    @Action(SetupWarehouseAction.GetAll)
    getWarehouse(ctx: StateContext<SetupWarehouseStateModel>) {
        return this._setupWarehouseService.getAllWarehouse()
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

    @Action(SetupWarehouseAction.GetById)
    getByIdWarehouse(ctx: StateContext<SetupWarehouseStateModel>, action: any) {
        return this._setupWarehouseService.getById(action.payload)
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

    @Action(SetupWarehouseAction.Save)
    saveWarehouse(ctx: StateContext<SetupWarehouseStateModel>, action: any) {
        return this._setupWarehouseService.saveWarehouse(action.payload)
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

    @Action(SetupWarehouseAction.Update)
    updateWarehouse(ctx: StateContext<SetupWarehouseStateModel>, action: any) {
        return this._setupWarehouseService.updateWarehouse(action.payload)
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

    @Action(SetupWarehouseAction.Delete)
    deleteWarehouse(ctx: StateContext<SetupWarehouseStateModel>, action: any) {
        return this._setupWarehouseService.deleteWarehouse(action.payload)
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