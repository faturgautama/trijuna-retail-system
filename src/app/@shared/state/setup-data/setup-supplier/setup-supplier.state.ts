import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupSupplierAction } from "./setup-supplier.action";
import { SetupSupplierModel } from "src/app/@shared/models/setup-data/setup-supplier.model";
import { SetupSupplierService } from "src/app/@core/service/setup-data/setup-supplier/setup-supplier.service";

export interface SetupSupplierStateModel {
    entities: SetupSupplierModel.ISupplier[] | [];
}

@State<SetupSupplierStateModel>({
    name: 'setup_supplier',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupSupplierState {

    constructor(
        private _setupSupplierService: SetupSupplierService,
    ) { }

    @Selector()
    static allSetupMember(state: SetupSupplierStateModel) {
        return state.entities;
    }

    @Action(SetupSupplierAction.GetAll)
    getMember(ctx: StateContext<SetupSupplierStateModel>, action: any) {
        return this._setupSupplierService.getAllSupplier(action.payload)
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

    @Action(SetupSupplierAction.GetById)
    getByIdMember(ctx: StateContext<SetupSupplierStateModel>, action: any) {
        return this._setupSupplierService.getByIdSupplier(action.payload)
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

    @Action(SetupSupplierAction.Save)
    saveMember(ctx: StateContext<SetupSupplierStateModel>, action: any) {
        return this._setupSupplierService.saveSupplier(action.payload)
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

    @Action(SetupSupplierAction.Update)
    updateMember(ctx: StateContext<SetupSupplierStateModel>, action: any) {
        return this._setupSupplierService.updateSupplier(action.payload)
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

    @Action(SetupSupplierAction.Delete)
    deleteMember(ctx: StateContext<SetupSupplierStateModel>, action: any) {
        return this._setupSupplierService.deleteSupplier(action.payload)
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