import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateModule } from './@shared/state/state.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { CookiesUtils } from './@shared/utils/cookies.utils';
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
        ProgressSpinnerModule,
        StateModule.forRoot(),
    ],
    providers: [
        CookiesUtils,
        MessageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
