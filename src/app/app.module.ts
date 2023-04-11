import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookiesUtils } from './@shared/utils/cookies.utils';
import { StateModule } from './@shared/state/state.module';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        StateModule.forRoot(),
    ],
    providers: [
        CookiesUtils,
        MessageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
