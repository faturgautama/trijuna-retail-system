import { NgModule } from '@angular/core';
import { LoginComponent } from './feature/login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: LoginComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
