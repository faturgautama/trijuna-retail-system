import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgxsModule } from '@ngxs/store';
import { environment } from "src/environments/environment";
import { MenuState } from "./menu";
import { SETUP_DATA_STATE } from "./setup-data";
import { PEMBELIAN_STATE } from "./pembelian";

const STATES = [
    MenuState,
    ...SETUP_DATA_STATE,
    ...PEMBELIAN_STATE,
];

@NgModule({
    imports: [
        NgxsModule.forRoot([...STATES], {
            developmentMode: !environment.production,
        }),
    ],
})
export class StateModule {
    static forRoot(): ModuleWithProviders<StateModule> {
        return {
            ngModule: StateModule,
        }
    }
}