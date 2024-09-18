import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BerandaComponent } from "./feature/beranda/beranda.component";
import { TestPrintComponent } from "./feature/test-print/test-print.component";

const routes: Routes = [
    {
        path: '', component: BerandaComponent
    },
    {
        path: 'test-print', component: TestPrintComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BerandaRoutingModule { }