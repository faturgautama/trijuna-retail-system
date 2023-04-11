import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './feature/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ComponentsModule } from '../@shared/components/components.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ComponentsModule,
        ToastModule,
    ],
    providers: [
        MessageService,
    ]
})
export class AuthenticationModule { }
