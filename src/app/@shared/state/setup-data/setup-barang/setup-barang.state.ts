import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SetupBarangService } from "src/app/@core/service/setup-data/setup-barang/setup-barang.service";
import { SetupBarangModel } from "src/app/@shared/models/setup-data/setup-barang.model";
import { SetupBarangAction } from "./setup-barang.action";

export interface SetupBarangStateModel {
    entities: SetupBarangModel.ISetupBarang[] | [];
}

@State<SetupBarangStateModel>({
    name: 'setup_barang',
    defaults: {
        entities: [],
    },
})
@Injectable()
export class SetupBarangState {

    constructor(
        private _setupBarangService: SetupBarangService,
    ) { }

    @Selector()
    static allSetupMember(state: SetupBarangStateModel) {
        return state.entities;
    }

    @Action(SetupBarangAction.GetAllBarang)
    getBarang(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.getAllBarang(action.payload)
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

    @Action(SetupBarangAction.GetByIdBarang)
    getByIdBarang(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.getByIdBarang(action.payload)
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

    @Action(SetupBarangAction.SaveBarang)
    saveBarang(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.saveBarang(action.payload)
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

    @Action(SetupBarangAction.UpdateBarang)
    updateBarang(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.updateBarang(action.payload)
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

    @Action(SetupBarangAction.DeleteBarang)
    deleteBarang(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.deleteBarang(action.payload)
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

    // ** Setup Barang Satuan
    @Action(SetupBarangAction.GetAllBarangSatuan)
    getBarangSatuan(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.getAllBarangSatuan(action.payload)
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

    @Action(SetupBarangAction.SaveBarangSatuan)
    saveBarangSatuan(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.saveBarangSatuan(action.payload)
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

    @Action(SetupBarangAction.UpdateBarangSatuan)
    updateBarangSatuan(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.updateBarangSatuan(action.payload)
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

    @Action(SetupBarangAction.DeleteBarangSatuan)
    deleteBarangSatuan(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.deleteBarangSatuan(action.payload)
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

    // ** Setup Barang Rak
    @Action(SetupBarangAction.GetAllBarangRak)
    getBarangRak(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.getAllBarangRak(action.payload)
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

    @Action(SetupBarangAction.SaveBarangRak)
    saveBarangRak(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.saveBarangRak(action.payload)
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

    @Action(SetupBarangAction.UpdateBarangRak)
    updateBarangRak(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.updateBarangRak(action.payload)
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

    @Action(SetupBarangAction.DeleteBarangRak)
    deleteBarangRak(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.deleteBarangRak(action.payload)
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

    // ** Setup Barang Komponen
    @Action(SetupBarangAction.GetAllBarangKomponen)
    getBarangKomponen(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.getAllBarangKomponen(action.payload)
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

    @Action(SetupBarangAction.SaveBarangKomponen)
    saveBarangKomponen(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.saveBarangKomponen(action.payload)
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

    @Action(SetupBarangAction.UpdateBarangKomponen)
    updateBarangKomponen(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.updateBarangKomponen(action.payload)
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

    @Action(SetupBarangAction.DeleteBarangKomponen)
    deleteBarangKomponen(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.deleteBarangKomponen(action.payload)
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

    // ** Setup Barang Urai
    @Action(SetupBarangAction.GetAllBarangUrai)
    getBarangUrai(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.getAllBarangUrai(action.payload)
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

    @Action(SetupBarangAction.SaveBarangUrai)
    saveBarangUrai(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.saveBarangUrai(action.payload)
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

    @Action(SetupBarangAction.UpdateBarangUrai)
    updateBarangUrai(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.updateBarangUrai(action.payload)
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

    @Action(SetupBarangAction.DeleteBarangUrai)
    deleteBarangUrai(ctx: StateContext<SetupBarangStateModel>, action: any) {
        return this._setupBarangService.deleteBarangUrai(action.payload)
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